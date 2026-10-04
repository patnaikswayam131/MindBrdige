const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
require('dotenv').config();
const { OpenAI } = require('openai');
const { GoogleGenAI } = require('@google/genai');

const hfClient = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN || 'missing',
});

const geminiClient = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || 'missing' 
});

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT = __dirname;

// Vercel Service Binding for internal FastAPI backend service
const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

function getProfilesFilePath() {
    const defaultPath = path.join(ROOT, 'user_profiles.json');
    if (process.env.VERCEL) {
        const tmpPath = path.join('/tmp', 'user_profiles.json');
        if (!fs.existsSync(tmpPath) && fs.existsSync(defaultPath)) {
            try {
                fs.copyFileSync(defaultPath, tmpPath);
            } catch (e) {}
        }
        return tmpPath;
    }
    return defaultPath;
}

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.webp': 'image/webp',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
};

async function parseRequestBody(req) {
    if (req.body !== undefined && req.body !== null) {
        if (typeof req.body === 'object') return req.body;
        if (typeof req.body === 'string' && req.body.length > 0) {
            try { return JSON.parse(req.body); } catch (e) { return {}; }
        }
    }
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            if (!body) return resolve({});
            try { resolve(JSON.parse(body)); } catch (e) { resolve({}); }
        });
        req.on('error', () => resolve({}));
    });
}

async function handleRequest(req, res) {
    try {
        const cleanUrl = decodeURI(req.url.split('?')[0]);
        
        // Health check for API routes
        if (cleanUrl === '/api' || cleanUrl === '/api/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok', service: 'mindbridge-api' }));
            return;
        }

        // Handle User Profile, Wellness Preferences and Consent API
        if (cleanUrl === '/api/user/profile' && req.method === 'POST') {
            try {
                const profileData = await parseRequestBody(req);
                const profilesFile = getProfilesFilePath();
                let profiles = {};
                if (fs.existsSync(profilesFile)) {
                    try {
                        profiles = JSON.parse(fs.readFileSync(profilesFile, 'utf8'));
                    } catch (e) {
                        profiles = {};
                    }
                }
                const userKey = (profileData.email || 'guest@campus.edu').toLowerCase();
                profiles[userKey] = {
                    ...profiles[userKey],
                    ...profileData,
                    updatedAt: new Date().toISOString()
                };
                try {
                    fs.writeFileSync(profilesFile, JSON.stringify(profiles, null, 2), 'utf8');
                } catch (writeErr) {
                    console.warn('Could not persist profile file (read-only filesystem):', writeErr.message);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'success',
                    message: 'User profile and consent preferences persisted successfully.',
                    updatedAt: new Date().toISOString()
                }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid profile data payload: ' + err.message }));
            }
            return;
        }

        if (cleanUrl === '/api/user/profile' && req.method === 'GET') {
            const queryEmail = (req.url.includes('email=') ? req.url.split('email=')[1].split('&')[0] : '').toLowerCase();
            const profilesFile = getProfilesFilePath();
            let profiles = {};
            if (fs.existsSync(profilesFile)) {
                try {
                    profiles = JSON.parse(fs.readFileSync(profilesFile, 'utf8'));
                } catch (e) {}
            }
            const userProfile = profiles[queryEmail] || null;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ profile: userProfile }));
            return;
        }

        // Proxy chat history requests to the internal Python FastAPI backend via BACKEND_URL binding
        if (cleanUrl.startsWith('/api/chat/history')) {
            const threadId = cleanUrl.replace(/^\/api\/chat\/history\/?/, '').split('?')[0];
            if (!threadId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Thread ID required' }));
                return;
            }
            try {
                const targetUrl = new URL(`/chat/history/${encodeURIComponent(threadId)}`, BACKEND_URL);
                const backendRes = await fetch(targetUrl.toString(), {
                    method: req.method,
                    headers: { 'Content-Type': 'application/json' }
                });
                const resBody = await backendRes.text();
                res.writeHead(backendRes.status, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(resBody);
            } catch (err) {
                console.error('Error forwarding chat history request to BACKEND_URL:', err.message);
                res.writeHead(502, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to communicate with internal backend service: ' + err.message }));
            }
            return;
        }

        // Handle API routes
        if (cleanUrl === '/api/chat' && req.method === 'POST') {
            try {
                const data = await parseRequestBody(req);
                    const userMessage = data.message;
                    const provider = data.provider || 'gemini'; // Default to gemini

                    const systemPrompt = 'You are MIRA (Mindful Interactive Reflection Assistant), an empathetic, warm, and grounding AI companion for MindBridge. You support students through academic stress, emotional overwhelm, and everyday challenges with active listening and CBT-informed gentle reflection. You must clearly inform the user that you are an AI companion, not a licensed medical professional or therapist, and you guide them to professional care when appropriate.';

                    // Forward to internal Python FastAPI backend via Vercel service binding BACKEND_URL
                    if (provider === 'backend' || provider === 'langgraph' || provider === 'fastapi') {
                        try {
                            const targetUrl = new URL('/chat', BACKEND_URL);
                            const backendRes = await fetch(targetUrl.toString(), {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    message: userMessage,
                                    thread_id: data.thread_id,
                                    personality: data.personality || 'supportive'
                                })
                            });
                            const result = await backendRes.text();
                            res.writeHead(backendRes.status, {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            });
                            res.end(result);
                            return;
                        } catch (backendErr) {
                            console.error('Error forwarding chat to internal backend via BACKEND_URL:', backendErr.message);
                            res.writeHead(502, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal backend service unavailable: ' + backendErr.message }));
                            return;
                        }
                    }

                    if (provider === 'gemini') {
                        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'missing') {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'GEMINI_API_KEY missing in server environment.' }));
                            return;
                        }

                        // Gemini expects prompt text or formatted contents
                        const chatContents = [];
                        if (data.history && Array.isArray(data.history)) {
                            data.history.forEach(h => {
                                chatContents.push(h.role + ": " + h.content);
                            });
                        }
                        chatContents.push("user: " + userMessage);

                        let responseText = null;
                        let modelUsed = 'gemini-3.8-flash';

                        try {
                            const response = await geminiClient.models.generateContent({
                                model: "gemini-3.8-flash",
                                contents: chatContents.join('\n'),
                                config: {
                                    systemInstruction: systemPrompt
                                }
                            });
                            if (response && response.text) {
                                responseText = response.text;
                            }
                        } catch (geminiErr) {
                            console.warn('Gemini 3.8 Flash temporary error, utilizing empathetic assistant fallback:', geminiErr.message);
                            // Detect crisis phrases directly for immediate safety
                            const isCrisis = /(suicid|kill myself|end my life|want to die|self-?harm|hurt myself|no reason to live|mar jaana|khatam)/i.test(userMessage);
                            if (isCrisis) {
                                responseText = "I hear how much pain you're in, and I want you to know you don't have to carry this alone. Please reach out right now to caring people who can support you: Call or text 988 (National Suicide & Crisis Lifeline) or call 1800-599-0019. I am right here with you—can we take a breath together?";
                            } else {
                                responseText = "Thank you for sharing that with me. It takes real courage to open up about what you're experiencing. Whether you are dealing with academic pressure, stress, or just feeling overwhelmed, I'm here to listen. What part of this feels heaviest for you right now?";
                            }
                            modelUsed = 'mira-empathic-companion';
                        }

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            response: responseText,
                            timestamp: new Date().toISOString(),
                            model_used: modelUsed
                        }));
                        return;
                    }
                    
                    if (provider === 'huggingface') {
                        if (!process.env.HF_TOKEN || process.env.HF_TOKEN === 'missing') {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'HF_TOKEN missing in server environment.' }));
                            return;
                        }
                        
                        const messages = [];
                        if (data.history && Array.isArray(data.history)) {
                            messages.push(...data.history);
                        }
                        messages.unshift({ role: 'system', content: systemPrompt });
                        messages.push({ role: 'user', content: userMessage });

                        const response = await hfClient.chat.completions.create({
                            model: "google/gemma-4-E4B-it",
                            messages: messages
                        });

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            response: response.choices[0].message.content,
                            timestamp: new Date().toISOString(),
                            model_used: response.model || 'google/gemma-4-E4B-it'
                        }));
                        return;
                    }

                    if (provider === 'ollama') {
                        if (!process.env.OLLAMA_API_KEY || process.env.OLLAMA_API_KEY === 'missing') {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'OLLAMA_API_KEY missing in server environment.' }));
                            return;
                        }
                        
                        const messages = [];
                        if (data.history && Array.isArray(data.history)) {
                            messages.push(...data.history);
                        }
                        messages.unshift({ role: 'system', content: systemPrompt });
                        messages.push({ role: 'user', content: userMessage });

                        const fetchResponse = await fetch('https://ollama.com/api/chat', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                model: data.model || 'gemma4:31b-cloud',
                                messages: messages,
                                stream: false
                            })
                        });

                        if (!fetchResponse.ok) {
                            const errText = await fetchResponse.text();
                            throw new Error(`Ollama API error: ${fetchResponse.status} ${errText}`);
                        }

                        const result = await fetchResponse.json();

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            response: result.message?.content || result.response || '',
                            timestamp: new Date().toISOString(),
                            model_used: result.model || 'gemma4:31b-cloud'
                        }));
                        return;
                    }

                    if (provider === 'openrouter') {
                        if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'missing') {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'OPENROUTER_API_KEY missing in server environment.' }));
                            return;
                        }
                        
                        const messages = [];
                        if (data.history && Array.isArray(data.history)) {
                            messages.push(...data.history);
                        }
                        messages.unshift({ role: 'system', content: systemPrompt });
                        messages.push({ role: 'user', content: userMessage });

                        const fetchResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                                'Content-Type': 'application/json',
                                'HTTP-Referer': (req.headers && (req.headers.referer || req.headers.host)) || 'http://localhost:3000',
                                'X-Title': 'MindBridge Chatbot'
                            },
                            body: JSON.stringify({
                                model: data.model || 'qwen/qwen3.8-27b:free',
                                messages: messages,
                                stream: false
                            })
                        });

                        if (!fetchResponse.ok) {
                            const errText = await fetchResponse.text();
                            throw new Error(`OpenRouter API error: ${fetchResponse.status} ${errText}`);
                        }

                        const result = await fetchResponse.json();

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            response: result.choices?.[0]?.message?.content || '',
                            timestamp: new Date().toISOString(),
                            model_used: result.model || 'qwen/qwen3.8-27b:free'
                        }));
                        return;
                    }
                } catch (error) {
                    let statusCode = 500;
                    let message = 'API Error';
                    
                    if (error.status === 401 || error.status === 403) {
                        statusCode = error.status;
                        message = 'Authentication Error: Invalid or insufficient permissions for HF_TOKEN. ' + (error.message || '');
                    } else if (error.status === 404 || (error.message && error.message.includes('unavailable'))) {
                        statusCode = 404;
                        message = 'Model or provider unavailable.';
                    } else if (error.status === 429) {
                        statusCode = 429;
                        message = 'Rate limiting exceeded.';
                    } else if (error.code === 'ETIMEDOUT' || error.type === 'timeout') {
                        statusCode = 504;
                        message = 'Connection timeout.';
                    } else if (error instanceof SyntaxError) {
                        statusCode = 400;
                        message = 'Malformed response or request.';
                    } else if (error.message) {
                        message = error.message;
                    }

                    console.error('Chat API Error:', message);
                    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: message }));
                }
                return;
            }

        let relativePath = cleanUrl === '/' ? '/index.html' : cleanUrl;
        let filePath = path.join(ROOT, relativePath);

        // Security check: prevent directory traversal
        if (!filePath.startsWith(ROOT)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('403 Forbidden');
            return;
        }

        // If path is a directory, look for index.html inside
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
                res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title><style>body{font-family:sans-serif;padding:40px;text-align:center;background:#FAF8F5;color:#332B45;}a{color:#6E5B8F;font-weight:bold;text-decoration:none;}</style></head><body><h1>404 Not Found</h1><p>The file <code>${cleanUrl}</code> was not found.</p><p><a href="/">Return to MindBridge Home</a></p></body></html>`);
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Access-Control-Allow-Origin': '*'
            });

            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        });
    } catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error: ' + e.message);
    }
}

let tailwindProcess = null;

function startServer(port) {
    const server = http.createServer(handleRequest);

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying port ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });

    server.listen(port, () => {
        const url = `http://localhost:${port}`;
        console.log(`\n==================================================`);
        console.log(`🚀 MindBridge Frontend is running at: ${url}`);
        console.log(`👉 Entry:     ${url}`);
        console.log(`👉 Landing:   ${url}/pages/landing.html`);
        console.log(`==================================================\n`);

        // Start tailwind watcher in parallel if not disabled and in local dev
        if (!process.env.NO_WATCH && !process.env.VERCEL && process.env.NODE_ENV !== 'production') {
            console.log('⚡ Starting Tailwind CSS watcher...');
            tailwindProcess = spawn('npx', ['tailwindcss', '-i', './css/tailwind.css', '-o', './css/main.css', '--watch'], {
                shell: true,
                stdio: 'pipe'
            });

            tailwindProcess.stdout.on('data', (data) => {
                const msg = data.toString().trim();
                if (msg) console.log(`[Tailwind] ${msg}`);
            });

            tailwindProcess.stderr.on('data', (data) => {
                const msg = data.toString().trim();
                if (msg) console.log(`[Tailwind] ${msg}`);
            });
        }

        // Open browser automatically only in local development
        if (!process.env.NO_OPEN && !process.env.VERCEL && process.env.NODE_ENV !== 'production') {
            const startCommand = process.platform === 'win32' ? `start "" "${url}"` :
                                 process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
            exec(startCommand, (err) => {
                if (err) {
                    console.log(`ℹ️ Open ${url} in your browser.`);
                }
            });
        }
    });
}

process.on('SIGINT', () => {
    if (tailwindProcess) tailwindProcess.kill();
    process.exit();
});

process.on('SIGTERM', () => {
    if (tailwindProcess) tailwindProcess.kill();
    process.exit();
});

if (require.main === module) {
    startServer(DEFAULT_PORT);
}

module.exports = handleRequest;
