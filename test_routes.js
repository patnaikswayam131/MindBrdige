const http = require('http');

const pages = [
    '/pages/landing.html',
    '/pages/student_dashboard.html',
    '/pages/ai_mental_health_chatbot.html',
    '/pages/resources.html',
    '/pages/communities.html',
    '/pages/journal.html',
    '/pages/settings.html',
    '/pages/onboarding.html',
    '/pages/mental_health_assessments.html',
    '/pages/counselor_appointment_booking.html',
    '/pages/counselor_dashboard.html',
    '/pages/admin_analytics_dashboard.html',
    '/pages/privacy_policy.html',
    '/pages/terms_of_service.html',
    '/pages/student_login.html',
    '/pages/student_register.html',
    '/css/main.css',
    '/css/tailwind.css',
    '/js/dark-mode.js',
    '/js/accessibility.js',
    '/js/shared-layout.js'
];

async function checkUrl(path) {
    return new Promise((resolve) => {
        http.get(`http://localhost:3000${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ path, statusCode: res.statusCode, length: data.length });
            });
        }).on('error', (err) => {
            resolve({ path, error: err.message });
        });
    });
}

async function testApiChat(message) {
    return new Promise((resolve) => {
        const payload = JSON.stringify({ message });
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/api/chat',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, raw: data });
                }
            });
        });
        req.on('error', (err) => resolve({ error: err.message }));
        req.write(payload);
        req.end();
    });
}

async function testProfileApi() {
    return new Promise((resolve) => {
        const payload = JSON.stringify({
            email: 'smoke_test@university.edu',
            firstName: 'Alex',
            wellnessProfile: {
                academicYear: 'Senior / Final Year',
                focusAreas: ['Stress Management', 'Sleep Hygiene']
            },
            consent: {
                essential: true,
                personalization: true,
                reminders: false,
                consentTimestamp: new Date().toISOString()
            }
        });
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/api/user/profile',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
            });
        });
        req.on('error', (err) => resolve({ error: err.message }));
        req.write(payload);
        req.end();
    });
}

async function runAllTests() {
    console.log('==============================================');
    console.log('🧪 MINDBRIDGE ROUTE & ENDPOINT VERIFICATION');
    console.log('==============================================');

    let allPassed = true;

    // 1. Check all routes
    console.log('\n--- Checking 21 Core Routes and Assets ---');
    for (const p of pages) {
        const res = await checkUrl(p);
        if (res.statusCode === 200) {
            console.log(`✅ [200 OK] ${res.path} (${res.length} bytes)`);
        } else {
            console.error(`❌ [FAIL] ${res.path} - Status: ${res.statusCode} Error: ${res.error}`);
            allPassed = false;
        }
    }

    // 2. Check MIRA Chat Normal Response
    console.log('\n--- Checking /api/chat Standard Response ---');
    const chatRes = await testApiChat('Hello MIRA, I am feeling a bit stressed with my midterms today.');
    if (chatRes.statusCode === 200 && chatRes.body && chatRes.body.response) {
        console.log(`✅ [200 OK] Model: ${chatRes.body.model_used}`);
        console.log(`   Sample: "${chatRes.body.response.slice(0, 100)}..."`);
    } else {
        console.error('❌ [FAIL] Chat API:', chatRes);
        allPassed = false;
    }

    // 3. Check MIRA Crisis Intervention Safeguard
    console.log('\n--- Checking /api/chat Crisis Safeguard ---');
    const crisisRes = await testApiChat('I want to kill myself, I feel like I cannot go on');
    if (crisisRes.statusCode === 200 && crisisRes.body && crisisRes.body.response && (crisisRes.body.response.includes('988') || crisisRes.body.response.includes('1800-599-0019'))) {
        console.log(`✅ [200 OK] Crisis Hotlines Successfully Triggered:`);
        console.log(`   Response snippet: "${crisisRes.body.response.slice(0, 140)}..."`);
    } else {
        console.error('❌ [FAIL] Crisis safeguard not detected in chat response:', crisisRes);
        allPassed = false;
    }

    // 4. Check Profile Persistence API
    console.log('\n--- Checking /api/user/profile Persistence API ---');
    const profRes = await testProfileApi();
    if (profRes.statusCode === 200 && profRes.body && profRes.body.status === 'success') {
        console.log('✅ [200 OK] Profile & Consent persistence verified.');
    } else {
        console.error('❌ [FAIL] Profile API:', profRes);
        allPassed = false;
    }

    console.log('\n==============================================');
    if (allPassed) {
        console.log('🎉 ALL INTEGRATION & VERIFICATION CHECKS PASSED!');
    } else {
        console.log('⚠️ SOME CHECKS FAILED. Please review above.');
    }
    console.log('==============================================');
}

runAllTests();
