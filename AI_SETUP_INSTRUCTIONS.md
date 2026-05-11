# MindBridge AI Chat Integration Setup

This guide will help you set up the AI-powered chatbot for your MindBridge application using FastAPI, LangGraph, and Groq.

## Prerequisites

1. **Python 3.8+** installed on your system
2. **Groq API Key** - Get one from [https://console.groq.com/](https://console.groq.com/)

## Setup Instructions

### 1. Navigate to Backend Directory

```bash
cd "C:\Users\sibap\Programming\mindbridge-main (2)\mindbridge-main\backend"
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Virtual Environment

```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

1. Open the `.env` file in the backend directory
2. Replace `your_groq_api_key_here` with your actual Groq API key:

```
GROQ_API_KEY=gsk_your_actual_api_key_here
```

### 6. Start the FastAPI Server

```bash
python main.py
```

Or use the provided batch file:

```bash
start.bat
```

The server will start on `http://localhost:8000`

### 7. Test the API

Visit `http://localhost:8000/docs` in your browser to see the interactive API documentation.

### 8. Open the Chatbot

Open `pages/ai_mental_health_chatbot.html` in your browser. The chatbot will now be powered by the AI backend.

## Features

### ✅ AI-Powered Responses

- Uses Groq's Mixtral-8x7B model for intelligent responses
- Mental health-focused conversation flow
- Crisis intervention awareness

### ✅ Conversation Threading

- LangGraph manages conversation history
- Thread-based conversation persistence
- Context-aware responses

### ✅ Real-time Communication

- WebSocket support for real-time chat
- REST API endpoints for standard requests
- Automatic reconnection handling

### ✅ Mental Health Focus

- Specialized prompts for mental health support
- Crisis resource integration
- Empathetic and professional responses

## API Endpoints

- `POST /chat` - Send a message and get AI response
- `GET /chat/history/{thread_id}` - Get conversation history
- `DELETE /chat/history/{thread_id}` - Clear conversation history
- `WS /ws/{thread_id}` - WebSocket connection for real-time chat
- `GET /health` - Health check endpoint

## Troubleshooting

### Common Issues:

1. **"Module not found" errors**: Make sure the virtual environment is activated and all dependencies are installed
2. **Groq API errors**: Verify your API key is correct in the `.env` file
3. **CORS errors**: The server is configured to allow all origins for development
4. **Port conflicts**: If port 8000 is in use, modify the port in `main.py`

### Getting Help:

If you encounter issues:

1. Check the console output for error messages
2. Verify all dependencies are installed correctly
3. Ensure your Groq API key has sufficient credits
4. Check that the backend server is running before using the chatbot

## Security Notes

- The current setup is for development purposes
- In production, configure proper CORS origins
- Use environment variables for sensitive data
- Consider implementing user authentication
- Add rate limiting for API endpoints

## Next Steps

1. **Customize the AI Prompt**: Modify `MENTAL_HEALTH_PROMPT` in `main.py` to adjust the AI's behavior
2. **Add User Authentication**: Implement user sessions and personalized responses
3. **Database Integration**: Store conversation history in a database instead of memory
4. **Enhanced Features**: Add sentiment analysis, mood tracking, or appointment scheduling integration

## File Structure

```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables
└── start.bat           # Windows startup script

js/
└── chat-integration.js  # Frontend JavaScript integration

pages/
└── ai_mental_health_chatbot.html  # Updated chatbot page
```

The integration is now complete! Your MindBridge chatbot will provide intelligent, context-aware responses powered by Groq's AI model.
