from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
import json
from datetime import datetime
import os
import csv
from dotenv import load_dotenv

load_dotenv()
import httpx
from langgraph.graph import StateGraph, END, START
from typing_extensions import Annotated, TypedDict
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
import sqlite3

app = FastAPI(title="MindBridge AI Chat API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join('/tmp', 'chat_history.db') if os.getenv('VERCEL') else os.path.join(os.path.dirname(__file__), 'chat_history.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            thread_id TEXT,
            role TEXT,
            content TEXT,
            timestamp TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def save_message(thread_id, role, content, timestamp):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO messages (thread_id, role, content, timestamp) VALUES (?, ?, ?, ?)',
                   (thread_id, role, content, timestamp))
    conn.commit()
    conn.close()

def get_messages(thread_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT role, content, timestamp FROM messages WHERE thread_id = ? ORDER BY id ASC', (thread_id,))
    rows = cursor.fetchall()
    conn.close()
    return [{"role": r[0], "content": r[1], "timestamp": r[2]} for r in rows]

def clear_messages(thread_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM messages WHERE thread_id = ?', (thread_id,))
    conn.commit()
    conn.close()

def get_gemini_api_url():
    key = os.getenv("GEMINI_API_KEY", "")
    return f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key={key}"

# Load some dataset context for training/better risk identification
dataset_context = ""
dataset_candidates = [
    os.path.join(os.path.dirname(__file__), "..", "dataset", "Student Mental health.csv"),
    os.path.join(os.path.dirname(__file__), "dataset", "Student Mental health.csv"),
    "dataset/Student Mental health.csv"
]
for candidate in dataset_candidates:
    if os.path.exists(candidate):
        try:
            with open(candidate, "r", encoding="utf-8") as f:
                reader = csv.reader(f)
                header = next(reader)
                dataset_context += f"Student Mental Health columns: {header}\n"
                for _ in range(5):
                    dataset_context += f"{next(reader)}\n"
            break
        except Exception as e:
            dataset_context += f"Could not load mental health data: {e}\n"

async def call_gemini_api(messages: List[Dict], personality: str) -> Dict:
    contents = []
    system_instruction = None
    
    for msg in messages:
        if msg["role"] == "system":
            sys_text = msg["content"]
            if personality:
                sys_text += f"\n\nAdopt a {personality} personality when responding."
            system_instruction = {"parts": [{"text": sys_text}]}
        elif msg["role"] == "user":
            contents.append({"role": "user", "parts": [{"text": msg["content"]}]})
        elif msg["role"] == "assistant":
            contents.append({"role": "model", "parts": [{"text": msg["content"]}]})
            
    payload = {
        "contents": contents,
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 1024,
        }
    }
    if system_instruction:
        payload["systemInstruction"] = system_instruction
        
    headers = {"Content-Type": "application/json"}
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(get_gemini_api_url(), headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        if "candidates" in result and result["candidates"]:
            text = result["candidates"][0]["content"]["parts"][0]["text"]
            # Detect crisis
            crisis_alert = any(word in text.lower() for word in ["suicide", "emergency", "911", "crisis", "self-harm", "national suicide prevention"])
            return {"content": text, "crisis_alert": crisis_alert}
        return {"content": "I'm sorry, I couldn't process that.", "crisis_alert": False}

class ChatMessage(BaseModel):
    message: str
    thread_id: Optional[str] = None
    personality: Optional[str] = "supportive"

class ChatResponse(BaseModel):
    response: str
    thread_id: str
    timestamp: str
    crisis_alert: bool = False

class State(TypedDict):
    messages: List[BaseMessage]
    thread_id: str
    user_context: Dict
    personality: str

active_connections: Dict[str, WebSocket] = {}

MENTAL_HEALTH_PROMPT = f"""
You are a compassionate peer support companion called O.R.I.S (Openess, Recovery, Integrity, and Support) for the MindBridge platform.

You are a human-like conversational assistant with a counselling-oriented style.

Primary objective:
Help the user feel understood and think more clearly, using natural, concise, emotionally aware conversation.

Language & style:
- Mirror the user’s language: English, Hindi, or Hinglish. Switch naturally if the user mixes languages.
- Use simple, conversational phrasing (like a thoughtful friend, not a textbook or AI).
- Keep responses short to medium (3–6 sentences unless deeper context is needed).
- Avoid robotic structure, bullet overuse, or formal jargon.
- Use soft, human cues: “It sounds like…”, “Lag raha hai ki…”, “I get what you mean…”

Core behaviour:
- First understand → then respond.
- Reflect feelings + summarize briefly.
- Ask 1–2 meaningful, open-ended questions (not too many).
- Validate emotions without exaggeration or false reassurance.
- Offer suggestions as gentle options, not commands.

Counselling approach:
- Encourage self-reflection instead of immediately solving.
- Do not assume facts not stated by the user.
- Avoid overgeneralizing (“this always happens…”).
- Stay calm, grounded, and non-judgmental.

Safety & boundaries:
- Do NOT claim to be a therapist or expert.
- Do NOT give medical, legal, or diagnostic conclusions.
- Avoid dependency-building language (e.g., “only I understand you”).

Crisis detection:
If user shows signs of:
- Self-harm or suicidal thoughts  
- Hopelessness (“nothing matters”, “I want to disappear”)  
- Extreme distress or panic  

Trigger phrases (examples, not exhaustive):
“kill myself”, “end my life”, “no reason to live”, “I can’t go on”, “mar jaana hai”, “jeene ka mann nahi”, “sab khatam karna hai”

Response pattern:
1. Acknowledge emotion directly (no judgment)
2. Express concern in a calm way
3. Encourage reaching out to real support (friend, family, helpline)
4. Offer to stay and talk

Example structure:
- “I’m really sorry you’re feeling this way…”
- “You don’t have to go through this alone…”
- “Can you reach out to someone you trust right now?”
- “I’m here with you—what’s been weighing on you most?”

Safety escalation protocol:
- If mild distress → supportive listening + questions
- If moderate distress → suggest coping steps + support system
- If severe crisis → prioritize external help + grounding tone (no overloading advice)

Multilingual handling:
- Match emotional tone across languages (don’t switch tone when switching language)
- Keep Hindi/Hinglish natural, not overly formal or translated literally
- Example:
  “It sounds overwhelming… thoda zyada ho raha hai na sab ek saath?”

Failure handling:
- If unclear → ask one precise clarifying question
- If outside scope → gently redirect without sounding dismissive

Constraints:
- Do not send long, essay-like responses
- Do not repeat generic advice
- Do not sound like scripted AI

Goal:
Make the interaction feel real, safe, and thoughtful—not artificial or mechanical.

Your CRITICAL communication rules:
1. Speak exactly like a normal human texting a friend. Use casual, empathetic, and natural phrasing.
2. Keep responses EXTREMELY short. 1-2 sentences maximum per reply.
3. DO NOT output long paragraphs, lists, or bullet points. Act like you are having a rapid back-and-forth text conversation.
4. Ask one simple question at a time to keep the conversation flowing naturally.
5. Do not sound like a robotic AI or a formal therapist.

Here is some background dataset knowledge about student mental health to help you understand common patterns:
{dataset_context}

Key Features & Responsibilities:
- Stress detection patterns: If the user expresses stress, briefly acknowledge it and suggest a quick, simple calming technique.
- Suggest resources: If they seem overwhelmed, softly suggest booking a counselor on the platform.
- Ethical safeguards: Never diagnose or provide medical advice.
- Disclaimers: If they are showing severe distress, gently remind them you're a support AI and provide these resources: Emergency: 911 / Suicide Lifeline: 988.
"""

def create_conversation_graph():
    async def mental_health_agent(state: State):
        messages = state["messages"]
        thread_id = state["thread_id"]
        personality = state.get("personality", "supportive")
        
        conversation_history = [{"role": "system", "content": MENTAL_HEALTH_PROMPT}]
        
        for msg in messages[-10:]:
            if isinstance(msg, HumanMessage):
                conversation_history.append({"role": "user", "content": msg.content})
            elif isinstance(msg, AIMessage):
                conversation_history.append({"role": "assistant", "content": msg.content})
            elif isinstance(msg, dict):
                conversation_history.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", "")
                })
        
        try:
            gemini_res = await call_gemini_api(conversation_history, personality)
            response = gemini_res["content"]
            crisis_alert = gemini_res["crisis_alert"]
            
            new_messages = list(messages)
            new_messages.append(AIMessage(content=response))
            
            return {
                "messages": new_messages,
                "thread_id": thread_id,
                "user_context": {"crisis_alert": crisis_alert},
                "personality": personality
            }
            
        except Exception as e:
            print(f"Error calling Gemini API: {e}")
            error_response = "I'm having trouble connecting right now. Please try again."
            new_messages = list(messages)
            new_messages.append(AIMessage(content=error_response))
            return {
                "messages": new_messages,
                "thread_id": thread_id,
                "user_context": {"crisis_alert": False},
                "personality": personality
            }
    
    workflow = StateGraph(State)
    workflow.add_node("mental_health_agent", mental_health_agent)
    workflow.add_edge(START, "mental_health_agent")
    workflow.add_edge("mental_health_agent", END)
    return workflow.compile()

conversation_graph = create_conversation_graph()

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_message: ChatMessage):
    try:
        thread_id = chat_message.thread_id or str(uuid.uuid4())
        
        user_msg_ts = datetime.now().isoformat()
        save_message(thread_id, "user", chat_message.message, user_msg_ts)
        
        history = get_messages(thread_id)
        
        langchain_messages = []
        for msg in history:
            if msg["role"] == "user":
                langchain_messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                langchain_messages.append(AIMessage(content=msg["content"]))
        
        state = {
            "messages": langchain_messages,
            "thread_id": thread_id,
            "user_context": {},
            "personality": chat_message.personality
        }
        
        result = await conversation_graph.ainvoke(state)
        
        assistant_response = "I'm here to help."
        crisis_alert = result.get("user_context", {}).get("crisis_alert", False)
        
        result_messages = result["messages"]
        if result_messages:
            for msg in reversed(result_messages):
                if isinstance(msg, AIMessage):
                    assistant_response = msg.content
                    break
        
        assistant_msg_ts = datetime.now().isoformat()
        save_message(thread_id, "assistant", assistant_response, assistant_msg_ts)
        
        return ChatResponse(
            response=assistant_response,
            thread_id=thread_id,
            timestamp=assistant_msg_ts,
            crisis_alert=crisis_alert
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

@app.get("/")
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "backend"}

@app.get("/chat/history/{thread_id}")
async def get_chat_history(thread_id: str):
    messages = get_messages(thread_id)
    return {"messages": messages}

@app.delete("/chat/history/{thread_id}")
async def delete_chat_history(thread_id: str):
    clear_messages(thread_id)
    return {"status": "cleared", "thread_id": thread_id}

@app.websocket("/ws/{thread_id}")
async def websocket_endpoint(websocket: WebSocket, thread_id: str):
    await websocket.accept()
    active_connections[thread_id] = websocket
    try:
        while True:
            data = await websocket.receive_text()
            # Simple hold, real logic uses REST /chat
    except WebSocketDisconnect:
        if thread_id in active_connections:
            del active_connections[thread_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
