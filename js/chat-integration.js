class MindBridgeChatAPI {
    constructor(baseUrl = 'http://127.0.0.1:8000') {
        this.baseUrl = baseUrl;
        this.threadId = localStorage.getItem('mindbridge_thread_id') || null;
        this.websocket = null;
    }

    // Send message via REST API
    async sendMessage(message, personality = "supportive") {
        try {
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
        if (!this.threadId) return;

        try {
            await fetch(`${this.baseUrl}/chat/history/${this.threadId}`, {
                method: 'DELETE'
            });
            
            // Clear local storage and reset thread
            localStorage.removeItem('mindbridge_thread_id');
            this.threadId = null;
            
            // Clear chat UI but keep welcome message
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                // Keep only the welcome message (first child)
                const welcomeMessage = chatMessages.firstElementChild;
                chatMessages.innerHTML = '';
                if (welcomeMessage) {
                    chatMessages.appendChild(welcomeMessage);
                }
            }
        } catch (error) {
            console.error('Error clearing chat history:', error);
        }
    }

    // Utility methods
    generateThreadId() {
        return 'thread_' + Math.random().toString(36).substr(2, 9);
    }

    appendMessage(content, role, timestamp) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        const currentTime = new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        if (role === 'user') {
            messageDiv.innerHTML = `
                <div class="flex items-start space-x-3 justify-end">
                    <div class="flex-1 flex justify-end">
                        <div class="bg-primary text-white rounded-lg p-4 max-w-md">
                            <p>${content}</p>
                        </div>
                    </div>
                    <div class="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <div class="bg-gray-50 rounded-lg p-4 max-w-md">
                            <p class="text-text-primary">${content}</p>
                        </div>
                        <p class="text-xs text-text-secondary mt-1">Today, ${currentTime}</p>
                    </div>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize chat API
const chatAPI = new MindBridgeChatAPI();

// Update the existing chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    // Load chat history on page load
    chatAPI.getChatHistory().then(messages => {
        messages.forEach(msg => {
            chatAPI.appendMessage(msg.content, msg.role, msg.timestamp);
        });
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

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start mb-4';
        typingDiv.innerHTML = `
            <div class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                <p class="text-sm">AI is typing...</p>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const personalitySelect = document.getElementById('chatPersonality');
            const personality = personalitySelect ? personalitySelect.value : "supportive";
            
            // Send message to API
            const response = await chatAPI.sendMessage(message, personality);
            
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
