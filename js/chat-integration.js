class MindBridgeChatAPI {
    constructor(baseUrl = 'http://127.0.0.1:8000') {
        this.baseUrl = baseUrl;
        this.threadId = localStorage.getItem('mindbridge_thread_id') || null;
        this.websocket = null;
    }

    // Send message via REST API
    async sendMessage(message, personality = "supportive", provider = "openrouter") {
        try {
            if (provider === "huggingface" || provider === "gemini" || provider === "ollama" || provider === "openrouter") {
                const response = await fetch(`/api/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: message, provider: provider })
                });
                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.error || `HTTP error! status: ${response.status}`);
                }
                return await response.json();
            }

            // Existing backend logic
            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    thread_id: this.threadId,
                    personality: personality
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Store thread ID
            this.threadId = data.thread_id;
            localStorage.setItem('mindbridge_thread_id', this.threadId);
            
            return data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    // Connect to WebSocket for real-time chat
    connectWebSocket() {
        if (!this.threadId) {
            this.threadId = this.generateThreadId();
            localStorage.setItem('mindbridge_thread_id', this.threadId);
        }

        this.websocket = new WebSocket(`ws://127.0.0.1:8000/ws/${this.threadId}`);
        
        this.websocket.onopen = () => {
            console.log('WebSocket connected');
        };

        this.websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleIncomingMessage(data);
        };

        this.websocket.onclose = () => {
            console.log('WebSocket disconnected');
            // Attempt to reconnect after 3 seconds
            setTimeout(() => this.connectWebSocket(), 3000);
        };

        this.websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    // Send message via WebSocket
    sendWebSocketMessage(message) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(JSON.stringify({
                message: message,
                timestamp: new Date().toISOString()
            }));
        } else {
            console.error('WebSocket not connected');
        }
    }

    // Handle incoming messages
    handleIncomingMessage(data) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            this.appendMessage(data.content, 'assistant', data.timestamp);
        }
    }

    // Get chat history
    async getChatHistory() {
        if (!this.threadId) return [];

        try {
            const response = await fetch(`${this.baseUrl}/chat/history/${this.threadId}`);
            if (response.ok) {
                const data = await response.json();
                return data.messages;
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
        return [];
    }

    // Clear chat history
    async clearChatHistory() {
        try {
            if (this.threadId) {
                await fetch(`${this.baseUrl}/chat/history/${this.threadId}`, {
                    method: 'DELETE'
                }).catch(e => console.warn('Could not clear remote history:', e));
            }
        } catch (error) {
            console.error('Error clearing chat history:', error);
        } finally {
            // Clear local storage and reset thread
            localStorage.removeItem('mindbridge_thread_id');
            this.threadId = null;
            
            // Clear chat UI and restore single canonical welcome message
            const messagesList = document.getElementById('messagesList');
            const chatMessages = document.getElementById('chatMessages');
            if (messagesList) {
                messagesList.innerHTML = `
                    <div id="initialWelcome" class="flex items-start gap-3.5 msg-enter w-full justify-start">
                        <img src="../images/mira_avatar.png" alt="MIRA" class="w-9 h-9 rounded-full object-cover border border-brand/30 flex-shrink-0 shadow-sm" />
                        <div class="flex flex-col gap-1 max-w-[85%] sm:max-w-[80%]">
                            <span class="text-caption text-text-secondary ml-1 font-medium">MIRA • Just now</span>
                            <div class="chat-bubble-ai p-4 rounded-2xl shadow-sm text-body-m text-text leading-relaxed">
                                Hi! I'm MIRA. I'm here to listen and help you navigate whatever is on your mind. We can talk about academics, stress, relationships, or anything else.<br><br>How are you feeling today?
                            </div>
                        </div>
                    </div>
                `;
            } else if (chatMessages) {
                const welcomeMessage = chatMessages.firstElementChild;
                chatMessages.innerHTML = '';
                if (welcomeMessage) {
                    chatMessages.appendChild(welcomeMessage);
                }
            }
        }
    }

    // Utility methods
    generateThreadId() {
        return 'thread_' + Math.random().toString(36).substr(2, 9);
    }

    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    appendMessage(content, role, timestamp) {
        const messagesList = document.getElementById('messagesList') || document.getElementById('chatMessages');
        const chatMessages = document.getElementById('chatMessages');
        if (!messagesList) return;

        const messageDiv = document.createElement('div');
        const timeObj = timestamp ? new Date(timestamp) : new Date();
        const currentTime = isNaN(timeObj.getTime()) ? 'Just now' : timeObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        if (role === 'user') {
            messageDiv.className = 'flex items-start gap-3.5 msg-enter w-full justify-end';
            messageDiv.innerHTML = `
                <div class="flex flex-col gap-1 items-end max-w-[85%] sm:max-w-[80%]">
                    <span class="text-caption text-text-secondary mr-1 font-medium">You • ${currentTime}</span>
                    <div class="chat-bubble-user p-4 rounded-2xl shadow-sm text-body-m leading-relaxed">
                        <p class="whitespace-pre-wrap">${this.escapeHtml(content)}</p>
                    </div>
                </div>
            `;
        } else {
            messageDiv.className = 'flex items-start gap-3.5 msg-enter w-full justify-start';
            messageDiv.innerHTML = `
                <img src="../images/mira_avatar.png" class="w-9 h-9 rounded-full object-cover border border-brand/20 flex-shrink-0 shadow-sm" alt="MIRA">
                <div class="flex flex-col gap-1 max-w-[85%] sm:max-w-[80%]">
                    <span class="text-caption text-text-secondary ml-1 font-medium">MIRA • ${currentTime}</span>
                    <div class="chat-bubble-ai p-4 rounded-2xl shadow-sm text-body-m text-text leading-relaxed">
                        <p class="whitespace-pre-wrap">${this.escapeHtml(content)}</p>
                    </div>
                </div>
            `;
        }
        
        messagesList.appendChild(messageDiv);
        
        // Scroll to bottom
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

// Initialize chat API
const chatAPI = new MindBridgeChatAPI();

// Update the existing chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const messagesList = document.getElementById('messagesList') || chatMessages;

    // Load chat history on page load
    chatAPI.getChatHistory().then(messages => {
        if (messages && messages.length > 0) {
            // Remove initial placeholder welcome if there is existing history to show
            const initialWelcome = document.getElementById('initialWelcome');
            if (initialWelcome) initialWelcome.remove();

            messages.forEach(msg => {
                chatAPI.appendMessage(msg.content, msg.role, msg.timestamp);
            });
        }
        // If empty, keep the single initialWelcome message already present in HTML!
    });

    // Connect WebSocket for real-time updates
    chatAPI.connectWebSocket();

    // Send message function
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // Add user message to UI immediately
        chatAPI.appendMessage(message, 'user', new Date().toISOString());
        messageInput.value = '';
        messageInput.style.height = 'auto';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex items-start gap-3.5 msg-enter w-full justify-start';
        typingDiv.innerHTML = `
            <img src="../images/mira_avatar.png" class="w-9 h-9 rounded-full object-cover border border-brand/20 flex-shrink-0 opacity-80" alt="MIRA">
            <div class="bg-surface border border-border text-text px-4 py-3 rounded-2xl flex items-center space-x-2 shadow-sm">
                <span class="inline-block w-2 h-2 rounded-full bg-brand animate-ping"></span>
                <p class="text-caption text-text-secondary font-medium">MIRA is reflecting...</p>
            </div>
        `;
        messagesList.appendChild(typingDiv);
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        try {
            const personalitySelect = document.getElementById('chatPersonality');
            const personality = personalitySelect ? personalitySelect.value : "supportive";
            
            // Send message to API
            const response = await chatAPI.sendMessage(message, personality, 'openrouter');
            
            // Handle crisis alert
            if (response.crisis_alert) {
                let alerts = JSON.parse(localStorage.getItem('crisisAlerts') || '[]');
                alerts.push({
                    timestamp: new Date().toISOString(),
                    message: "User indicated severe distress in chat.",
                    resolved: false
                });
                localStorage.setItem('crisisAlerts', JSON.stringify(alerts));
            }
            
            // Remove typing indicator
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            // Add assistant response
            chatAPI.appendMessage(response.response, 'assistant', response.timestamp);
            
        } catch (error) {
            // Remove typing indicator
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            // Show error message
            chatAPI.appendMessage(
                'Sorry, I\'m having trouble connecting right now. Please try again or contact a counselor directly if you need immediate support.',
                'assistant',
                new Date().toISOString()
            );
        }
    }

    // Event listeners
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Clear chat functionality
    const clearChatButton = document.getElementById('clearChat');
    if (clearChatButton) {
        clearChatButton.addEventListener('click', async () => {
            if (confirm('Are you sure you want to clear the chat history?')) {
                await chatAPI.clearChatHistory();
            }
        });
    }
});
