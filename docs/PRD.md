# MindBridge — Product Requirements Document (PRD)

**Document Identifier:** PRD-MINDBRIDGE-2026-V1  
**Status:** Approved & Authoritative  
**Target Platform:** Web (Desktop, Tablet, Mobile responsive)  
**Target Users:** College and university students, campus peer advocates, licensed counseling professionals, and academic mental wellness administrators.

---

## 1. Product Overview & Target Users

### 1.1 Product Vision
MindBridge is an empathetic, confidential, and comprehensive mental health and emotional well-being platform tailored specifically for college students. It bridges the critical gap between early emotional distress, peer-level guidance, AI-assisted self-reflection, and professional clinical care without stigma or administrative friction.

### 1.2 Target Personas
1. **The Overwhelmed Student (Primary):** Balancing examinations, deadlines, social pressures, and sleep disruption; seeking immediate, non-judgmental reflection, mood tracking, calming audio exercises, and 24/7 conversational support.
2. **The Help-Seeking Student (Secondary):** Experiencing persistent anxiety or mild-to-moderate depression; using standardized clinical screeners (PHQ-9, GAD-7) and booking confidential sessions with campus counselors.
3. **The Campus Counselor:** Managing confidential appointments, reviewing student intake requests and assessment histories, and providing tele-counseling support.
4. **The Academic Administrator:** Monitoring anonymized, aggregate campus wellness trends, high-stress periods during the semester, and crisis intervention statistics without violating individual privacy.

---

## 2. Product Goals & Non-Goals

### 2.1 Goals
- **Confidential & Dignified:** Privacy-first architecture where users feel completely safe sharing vulnerable thoughts and feelings.
- **Continuous Care Continuum:** Support spanning from self-care (meditation, journal, resources), peer support (communities), AI support (ORIS), to licensed human care (counselor booking).
- **Accessible & Warm:** WCAG 2.2 AA compliant with high-contrast mode, text-to-speech, keyboard navigation, and an editorial, calming visual aesthetic.
- **Zero Feature Regressions:** Every previously created route, interactive widget, and data store must remain fully intact.

### 2.2 Non-Goals
- MindBridge is **not** an emergency medical room or psychiatric crisis ward. Immediate danger cases are escalated unconditionally to national hotlines (`988`, `1800-599-0019`).
- MindBridge does **not** provide automated diagnostic claims. All screeners (PHQ-9, GAD-7) are explicitly self-monitoring tools that do not substitute for a clinician's diagnosis.
- MindBridge does **not** sell, monetize, or train third-party public AI models on private student journals or conversation logs.

---

## 3. User Roles & Permissions

| Role | Access Scope | Protected Routes | Default Landing |
|---|---|---|---|
| **Guest / Anonymous** | Public landing page, basic resource viewing, guest AI companion session, login/registration. | None | `/pages/landing.html` |
| **Student (Authenticated)** | Full student dashboard, mood tracker, ORIS chat with thread persistence, assessments, counselor appointment booking, private journal, communities, resources, settings & onboarding. | `/pages/student_dashboard.html`, `/pages/journal.html`, `/pages/settings.html`, `/pages/onboarding.html`, `/pages/communities.html` | `/pages/student_dashboard.html` |
| **Counselor (Authenticated)** | Counselor dashboard, scheduled client appointments, session management, availability slot controls. | `/pages/counselor_dashboard.html` | `/pages/counselor_dashboard.html` |
| **Administrator (Authenticated)** | Campus aggregate mental health analytics, screener frequency distributions, anonymized utilization reports. | `/pages/admin_analytics_dashboard.html` | `/pages/admin_analytics_dashboard.html` |

---

## 4. Navigation Structure & Route Inventory

```
MindBridge Application Tree
├── index.html (Root redirect to /pages/landing.html)
└── pages/
    ├── landing.html (Public marketing, approach, services, emergency banner)
    ├── student_login.html (Sign-in & role router)
    ├── student_register.html (Multi-step registration)
    ├── onboarding.html (NEW: Granular consent & wellness profile setup)
    ├── student_dashboard.html (Student hub, dynamic greeting, quotes, mood checkin, chart)
    ├── ai_mental_health_chatbot.html (ORIS 24/7 AI companion)
    ├── mental_health_assessments.html (PHQ-9, GAD-7, GHQ-12 screening suite)
    ├── counselor_appointment_booking.html (Counselor directory, slots, booking modal)
    ├── counselor_dashboard.html (Counselor portal)
    ├── admin_analytics_dashboard.html (Campus health analytics)
    ├── resources.html (NEW: 12-category resource library, audio player, bookmarks)
    ├── communities.html (NEW: Peer discussion spaces, wellness group participation)
    ├── journal.html (NEW: Distinctive private reflection journal, mood link, autosave)
    ├── settings.html (NEW: Profile, appearance, accessibility, consent, data export)
    ├── privacy_policy.html (FERPA/HIPAA data practices)
    └── terms_of_service.html (Terms & conditions)
```

---

## 5. Functional Requirements with Traceability IDs

### 5.1 Navigation & Layout
- **`NAV-001` (Global Navbar Consistency):** All student-authenticated pages must present a unified top navigation: Dashboard, Resources, Communities, Journal, Assessments, Appointments, and ORIS Chat. Must have an active page indicator, mobile responsive drawer, dark mode switch, and user profile avatar with dropdown.
- **`NAV-002` (Global Profile Menu):** The profile avatar dropdown must link reliably to Dashboard, Journal, Settings, and Sign Out without dead links.
- **`NAV-003` (Global Footer Restoration):** Every public and authenticated content page must include the restored global footer containing About, FAQs, Privacy Policy, Terms, Accessibility, Crisis Support, and Copyright.

### 5.2 Landing Page & Dashboard Experience
- **`LAND-001` (Context-Aware Welcome):** The student dashboard must display a personalized time-of-day greeting (e.g. "Good morning, Arjun" or "Good evening, Student" if name is unprovided), accompanied by an uplifting, non-judgmental welcome sentiment.
- **`LAND-002` (Attributed Inspirational Quotation):** Daily curated quotation with verified author attribution or platform-authored reflection. Must gracefully fallback if data is missing without breaking page layout.
- **`LAND-003` (Daily Reflection Check-in):** Gentle check-in prompt encouraging student to reflect on today's goals and emotional state.
- **`LAND-004` (Preserved Mood Check-in & Chart):** 5-point mood logger (Very Low to Great), stored persistently in `localStorage['mb_daily_checkin']`, rendering a smooth 7-day trend chart with light/dark/high-contrast adaptability and a "Demo Data" badge when fewer than 2 entries exist.
- **`LAND-005` (Appointments & Quick Actions):** Directly link to next booked counseling appointment or display an inviting empty state with a "Book a counselor" button.

### 5.3 ORIS AI Conversational Companion
- **`CHAT-001` (Robust Multi-Provider API Integration):** POST `/api/chat` in `server.js` and POST `/chat` in `backend/main.py` must reliably generate supportive responses using Google Gemini API (`gemini-2.5-flash` / `gemini-1.5-flash`), with fallbacks for Hugging Face and Ollama.
- **`CHAT-002` (Crisis Keyword Escalation):** If user messages contain self-harm or suicidal intent, ORIS must prioritize crisis helpline numbers (`988`, `1800-599-0019`), trigger an emergency badge, and display gentle de-escalation instructions.
- **`CHAT-003` (Readable AI Disclaimer):** Clear, high-contrast disclaimer prominently placed: "O.R.I.S is a supportive AI companion, not a licensed medical professional. For clinical emergencies, call crisis support."
- **`CHAT-004` (Personality & Interaction Controls):** Support "Supportive", "Direct & Solution-Focused", and "Just Listening" modes. Enable quick-response pills, speech-to-text dictation, chat clearing, and local transcript export.

### 5.4 Dedicated Resource Library
- **`RES-001` (Categorized Discovery):** 12 specific student categories: Music & Calming Audio, Breathing & Relaxation, Meditation & Grounding, Inspirational Reflections, Mental Health Articles, Stress & Anxiety, Sleep Hygiene, Academic Pressure, Relationships & Loneliness, Self-Care, Personal Journeys, and Professional Help.
- **`RES-002` (Search & Filtering):** Instant client-side search across titles, descriptions, and tags, with category pill filter buttons.
- **`RES-003` (Interactive Audio & Exercise Player):** Embedded accessible audio/meditation player widget with play/pause, progress scrubber, duration indicator, and calming background audio generators.
- **`RES-004` (Bookmark Persistence):** Authenticated students can save resources for later reading; bookmarks persist in `localStorage['mb_saved_resources']`.

### 5.5 Communities & Wellness Groups
- **`COMM-001` (Peer Community Hub):** Dedicated spaces for Academic Stress, Sleep & Routine, General Venting, Mindfulness & Balance, and First-Year Transition.
- **`COMM-002` (Discussion Threading & Interactions):** Students can browse posts, create new discussion threads, post replies, and react (support, heart, listen) with peer moderation guidelines.
- **`COMM-003` (Wellness Groups Discovery):** View guided weekly campus group therapy and peer sessions with goals, schedules, facilitator credentials, and one-click join/leave status stored in `localStorage['mb_user_groups']`.
- **`COMM-004` (Community Safety & Reporting):** Built-in "Report" button with reason modal to report inappropriate content, reinforcing safe peer conduct.

### 5.6 Distinctive Private Journal
- **`JOUR-001` (Guided Reflection Modes):** 8 distinct guided modes: Free Writing, Daily Check-In, Gratitude & Wins, Stress & Worry Dump, Academic Pressure, Emotional Processing, Tough Day Decompression, and Preparing for Counseling.
- **`JOUR-002` (Mood-Linked Entries):** Associate each entry with an optional emotion tag (Calm, Anxious, Hopeful, Exhausted, Proud, Down) to cross-reference with mood check-ins.
- **`JOUR-003` (Reliable Autosave & Draft Recovery):** Real-time autosave with distinct "Saving..." and "Saved" feedback badges. Automatic draft recovery prevents lost reflections on tab closure.
- **`JOUR-004` (Timeline, Search & Privacy):** Chronological timeline browsing, keyword search, tag filtering, entry pinning, markdown export, and strict client-side encryption/isolation.

### 5.7 User Settings & Profile Management
- **`SET-001` (Account & Profile):** Edit display name, graduation year/department, avatar initial, and view account role.
- **`SET-002` (Appearance & Theme):** Switch between Light, Dark, and High-Contrast modes with instant preview and persistent storage.
- **`SET-003` (Accessibility Preferences):** Toggle Text-To-Speech reader, adjustable font scale (Normal, Large, Extra Large), and reduced-motion override.
- **`SET-004` (Privacy, Consent & Data Controls):** Review active consent grants, withdraw optional analytics/personalization, export all personal data as JSON, or wipe local application history.

### 5.8 Consent-Based Onboarding Flow
- **`CONS-001` (Step-by-Step Transparency):** Clear explanation of what data is collected, why it is needed, and how it is stored.
- **`CONS-002` (Granular Consent Toggles):** Independent choices for Essential Service Data, Personalization & Preferences, and Reminder Notifications. No pre-checked boxes.
- **`CONS-003` (Non-Blocking Optional Fields):** Ability to skip optional background check-in without forfeiting platform access. Saved directly into user profile and editable anytime in Settings.

### 5.9 Accessibility & Theme System
- **`THEME-001` (Semantic CSS Design Tokens):** Universal variables for `--color-bg`, `--color-surface`, `--color-text`, `--color-border`, `--color-brand` with zero white-flash on reload.
- **`ACC-001` (High-Contrast Mode):** High-contrast token set (`data-contrast="high"`) with minimum 7:1 contrast ratio, high-visibility focus rings (`:focus-visible`), and distinct form borders.
- **`ACC-002` (Text-to-Speech Engine):** Web Speech API integration to read aloud articles, quotations, and reflection prompts with play/pause/stop controls.
- **`ACC-003` (Reduced Motion):** Honor `@media (prefers-reduced-motion: reduce)` across all CSS transitions and GSAP animations.

### 5.10 Security & Data Integrity
- **`PRIV-001` (No Secret Leaks):** API keys must only be read from server-side environment variables (`process.env.GEMINI_API_KEY`). Never expose private keys in client bundles.
- **`PRIV-002` (Client Isolation):** Private journals, assessment logs, and chat threads are scoped to the authenticated user ID and never shared across user sessions.

### 5.11 Verification & Testing
- **`TEST-001` (Comprehensive Verification):** Automated build verification (`npm run build:css`), syntax checks, endpoint verification, and user journey acceptance tests documented in `docs/ACCEPTANCE_TESTS.md`.

---

## 6. Acceptance Criteria Summary
A feature is considered `VERIFIED` only when:
1. It is accessible through designated UI navigation pathways without console errors.
2. It operates correctly in both Light and Dark themes, as well as High-Contrast mode.
3. It preserves state across browser reloads via persistent storage.
4. It functions responsively across standard viewport widths (375px mobile to 1440px desktop).
5. It handles network failures or empty states with polite, clear UI feedback.
