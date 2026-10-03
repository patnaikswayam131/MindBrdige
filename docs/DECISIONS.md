# MindBridge — Architecture & Product Decisions (ADR)

**Document Identifier:** DECISIONS-MINDBRIDGE-2026  
**Last Updated:** 2026-10-02  

---

## Decision Index
- **ADR-001:** Static Multi-Page Architecture with Vanilla JS and Tailwind CSS
- **ADR-002:** Dual AI Gateway Strategy (Node.js Proxy + FastAPI LangGraph Companion)
- **ADR-003:** Client-Side Storage Hierarchy with Migration Support
- **ADR-004:** Web Speech API for Native Accessibility Text-to-Speech
- **ADR-005:** High-Contrast Mode as an Orthogonal Dimension to Light/Dark Mode
- **ADR-006:** Editorial Visual Language (`DM Serif Display` + `DM Sans`) over Generic Cards

---

### ADR-001: Static Multi-Page Architecture with Vanilla JS and Tailwind CSS
- **Context:** The repository is composed of static HTML pages in `pages/`, styled with Tailwind CSS (`css/tailwind.css` -> `css/main.css`) and served via Node.js (`server.js`).
- **Decision:** Retain the static multi-page architecture with Vanilla JS and Tailwind CSS rather than converting to a single-page React framework.
- **Rationale:** Prevents regression of existing working routing, zero build breakage risk, instantaneous page loads, zero client bundle overhead, and guaranteed compatibility with existing scripts.
- **Consequences:** Reusable components (e.g. Navigation, Footer) must be systematically standardized across HTML files.

---

### ADR-002: Dual AI Gateway Strategy (Node.js Proxy + FastAPI LangGraph Companion)
- **Context:** The project features a Node.js server (`server.js`) on port 3000 hosting `/api/chat` and a Python FastAPI backend (`backend/main.py`) on port 8000.
- **Decision:** Maintain the Node.js `/api/chat` endpoint as the primary frontend gateway with automatic fallback to modern Google GenAI models (`gemini-2.5-flash` / `gemini-1.5-flash`), while preserving `backend/main.py` for advanced LangGraph stateful conversations and dataset risk evaluation.
- **Rationale:** Ensures that the frontend works out-of-the-box from a single `npm run dev` command while keeping the Python AI pipeline available.
- **Consequences:** Fix the model identifier in `server.js` so calls to `/api/chat` succeed immediately without timing out.

---

### ADR-003: Client-Side Storage Hierarchy with Migration Support
- **Context:** Student mood check-ins, assessment scores, booked appointments, and user accounts are currently stored in browser `localStorage`.
- **Decision:** Formalize strict schema namespaces for all client storage keys:
  - `mb_daily_checkin`: Array of `{ date: YYYY-MM-DD, mood: string, score: number }`
  - `mb_appointments`: Array of booked counselor sessions
  - `mb_assessment_history`: Historical screener results (PHQ-9, GAD-7, GHQ-12)
  - `mb_journal_entries`: Array of private journal entries
  - `mb_saved_resources`: Set of bookmarked resource IDs
  - `mb_user_groups`: Subscribed wellness groups and community memberships
  - `currentUser`: Authenticated session profile `{ email, role, firstName, lastName, consent }`
  - `theme`: `'light'` | `'dark'`
  - `contrast`: `'normal'` | `'high'`
- **Rationale:** Prevents collisions, simplifies data export in Settings (`SET-004`), and allows full offline capability.

---

### ADR-004: Web Speech API for Native Accessibility Text-to-Speech
- **Context:** PRD requirement `ACC-002` demands functional Text-To-Speech for articles and inspirational quotes.
- **Decision:** Implement native browser `window.speechSynthesis` (Web Speech API) with accessible Play, Pause, and Stop controls, handling browser differences gracefully.
- **Rationale:** Requires zero external dependencies, no paid API keys, zero network latency, and works offline.

---

### ADR-005: High-Contrast Mode as an Orthogonal Dimension to Light/Dark Mode
- **Context:** PRD requirement `ACC-001` specifies a high-contrast mode that is distinct from merely switching to dark mode.
- **Decision:** Implement High-Contrast via a root attribute `data-contrast="high"`. In this mode, background, surface, text, and border tokens switch to pure high-contrast values (pure black `#000000` / pure white `#FFFFFF`, thick 2px solid borders `#000000` or `#FFFFFF`, and high-luminance accent colors) with WCAG AAA compliance.
- **Rationale:** Ensures students with low vision or photophobia get extreme readability regardless of theme choice.

---

### ADR-006: Editorial Visual Language (`DM Serif Display` + `DM Sans`) over Generic Cards
- **Context:** The prompt strictly forbids generic SaaS dashboards with repetitive rounded card grids and weak hierarchy.
- **Decision:** Utilize `DM Serif Display` for headings with generous negative space, restrained borders, subtle tonal backgrounds, and asymmetrical, content-led layouts tailored to each activity (e.g. focused distraction-free journal writing, expansive resource reading, conversational chat).
- **Rationale:** Creates a calming, mature, trustworthy atmosphere appropriate for mental health and wellness.
