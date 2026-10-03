// MindBridge Professional Vector Icon System (Lucide-inspired 24x24 / 20x20 SVGs)
// Replaces all informal/unreliable emojis across MindBridge with crisp, accessible vector glyphs.

window.MindBridgeIcons = {
    // Renders an SVG with specified classes and optional extra attributes
    svg(pathD, { className = 'w-5 h-5', viewBox = '0 0 24 24', strokeWidth = 2, fill = 'none' } = {}) {
        return `<svg class="${className}" viewBox="${viewBox}" fill="${fill}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${pathD}</svg>`;
    },

    // --- QUICK SUPPORT & WELLNESS ACTIONS ---
    wind(cls = 'w-5 h-5') {
        return this.svg('<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>', { className: cls });
    },
    lungs(cls = 'w-5 h-5') {
        return this.svg('<path d="M12 4v16"/><path d="M12 9a4 4 0 0 0-4-4c-2.5 0-5 2.5-5 7 0 5 3 8 7 8a2 2 0 0 0 2-2"/><path d="M12 9a4 4 0 0 1 4-4c2.5 0 5 2.5 5 7 0 5-3 8-7 8a2 2 0 0 1-2-2"/>', { className: cls });
    },
    lotus(cls = 'w-5 h-5') {
        return this.svg('<path d="M12 3c-1.5 3-4 6-8 7 3.5 1.5 6 4.5 7 8 1-3.5 3.5-6.5 7-8-4-1-6.5-4-8-7z"/><path d="M12 18c-3-2-6-1-8 1 2 2 5 3 8 1 3 2 6 1 8-1-2-2-5-3-8-1z"/>', { className: cls });
    },
    chart(cls = 'w-5 h-5') {
        return this.svg('<path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/><path d="M2 20h20"/>', { className: cls });
    },

    // --- SOUND & AMBIENT PLAYER ---
    rain(cls = 'w-5 h-5') {
        return this.svg('<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>', { className: cls });
    },
    waves(cls = 'w-5 h-5') {
        return this.svg('<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>', { className: cls });
    },
    forest(cls = 'w-5 h-5') {
        return this.svg('<path d="m14 18 4-4H15l3-4h-2.5L18 6l-6 8h2.5l-3 4H14z"/><path d="m8 22 4-5H9.5l3-5H10l3-5-6 8h2.5l-3.5 5H8z"/>', { className: cls });
    },
    headphones(cls = 'w-5 h-5') {
        return this.svg('<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>', { className: cls });
    },
    music(cls = 'w-5 h-5') {
        return this.svg('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>', { className: cls });
    },

    // --- NATURE, SLEEP & ENVIRONMENT ---
    sun(cls = 'w-5 h-5') {
        return this.svg('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>', { className: cls });
    },
    moon(cls = 'w-5 h-5') {
        return this.svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>', { className: cls });
    },
    sparkles(cls = 'w-5 h-5') {
        return this.svg('<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>', { className: cls });
    },
    leaf(cls = 'w-5 h-5') {
        return this.svg('<path d="M11 20A7 7 0 0 1 4 13c0-4 3.5-7 7.5-9 3.5 2 7.5 5 7.5 9a7 7 0 0 1-7 7Z"/><path d="M11 20v-9"/>', { className: cls });
    },
    sprout(cls = 'w-5 h-5') {
        return this.svg('<path d="M7 20h10"/><path d="M10 20c0-5.5 2.5-9 2.5-9s2.5 3.5 2.5 9"/><path d="M12.5 11c-2-2.5-5-3.5-7.5-3 0 3 2.5 5.5 5 5.5"/><path d="M12.5 8c2-2.5 5-3.5 7.5-3 0 3-2.5 5.5-5 5.5"/>', { className: cls });
    },

    // --- ACADEMICS, COMMUNITY & SOCIAL ---
    academic(cls = 'w-5 h-5') {
        return this.svg('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>', { className: cls });
    },
    book(cls = 'w-5 h-5') {
        return this.svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', { className: cls });
    },
    chat(cls = 'w-5 h-5') {
        return this.svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', { className: cls });
    },
    users(cls = 'w-5 h-5') {
        return this.svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', { className: cls });
    },
    backpack(cls = 'w-5 h-5') {
        return this.svg('<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M8 10h8"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 14h4v4h-4z"/>', { className: cls });
    },

    // --- REACTION ICONS (Community & Posts) ---
    handshake(cls = 'w-4 h-4') {
        return this.svg('<path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0l-3.3 3.3"/><path d="m14 13-3-3a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l3.3-3.3"/><path d="M18 11V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5"/>', { className: cls });
    },
    heart(cls = 'w-4 h-4') {
        return this.svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>', { className: cls });
    },
    ear(cls = 'w-4 h-4') {
        return this.svg('<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a2 2 0 1 1-4 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 0 4 0"/>', { className: cls });
    },

    // --- JOURNAL & WRITING ---
    feather(cls = 'w-5 h-5') {
        return this.svg('<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>', { className: cls });
    },
    lightbulb(cls = 'w-5 h-5') {
        return this.svg('<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>', { className: cls });
    },
    zap(cls = 'w-5 h-5') {
        return this.svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', { className: cls });
    },
    shield(cls = 'w-5 h-5') {
        return this.svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', { className: cls });
    },
    stethoscope(cls = 'w-5 h-5') {
        return this.svg('<path d="M4.5 3v5a5.5 5.5 0 0 0 11 0V3"/><path d="M4.5 5h3"/><path d="M12.5 5h3"/><path d="M10 13.5v3.5a3 3 0 0 0 6 0V14"/><circle cx="18" cy="14" r="2"/>', { className: cls });
    },
    laptop(cls = 'w-5 h-5') {
        return this.svg('<rect width="18" height="12" x="3" y="4" rx="2"/><path d="M2 20h20"/>', { className: cls });
    },

    // --- PROFESSIONAL MOOD EMOTION GLYPHS (Replacing Emoji Faces) ---
    // Beautiful, dignified vector faces that feel clinical, gentle, and modern
    moodFace(level, cls = 'w-6 h-6') {
        switch (Number(level)) {
            case 1: // Very Low
                return this.svg(`
                    <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                    <circle cx="8.5" cy="10" r="1.25" fill="currentColor"/>
                    <circle cx="15.5" cy="10" r="1.25" fill="currentColor"/>
                    <path d="M16 16.5c-1.2-1.5-2.6-2-4-2s-2.8.5-4 2" stroke="currentColor"/>
                    <path d="M7 7.5l2 1" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M17 7.5l-2 1" stroke="currentColor" stroke-width="1.5"/>
                `, { className: cls });
            case 2: // Low
                return this.svg(`
                    <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                    <circle cx="8.5" cy="10" r="1.2" fill="currentColor"/>
                    <circle cx="15.5" cy="10" r="1.2" fill="currentColor"/>
                    <path d="M15 15.5c-1-1-2-1.5-3-1.5s-2 .5-3 1.5" stroke="currentColor"/>
                `, { className: cls });
            case 3: // Neutral / Balanced
                return this.svg(`
                    <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                    <circle cx="8.5" cy="10" r="1.2" fill="currentColor"/>
                    <circle cx="15.5" cy="10" r="1.2" fill="currentColor"/>
                    <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor"/>
                `, { className: cls });
            case 4: // Good
                return this.svg(`
                    <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                    <circle cx="8.5" cy="9.5" r="1.2" fill="currentColor"/>
                    <circle cx="15.5" cy="9.5" r="1.2" fill="currentColor"/>
                    <path d="M8.5 14c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2" stroke="currentColor"/>
                `, { className: cls });
            case 5: // Great
                return this.svg(`
                    <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                    <path d="M7.5 9.5c.5-.8 1.5-.8 2 0" stroke="currentColor" stroke-width="2"/>
                    <path d="M14.5 9.5c.5-.8 1.5-.8 2 0" stroke="currentColor" stroke-width="2"/>
                    <path d="M7.5 13.5c1.2 2.5 3 3.5 4.5 3.5s3.3-1 4.5-3.5" stroke="currentColor"/>
                    <path d="M18 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="currentColor" stroke="none"/>
                `, { className: cls });
            default:
                return this.svg('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>', { className: cls });
        }
    }
};
