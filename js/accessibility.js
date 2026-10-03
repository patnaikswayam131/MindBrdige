// MindBridge Accessibility Engine — Text-to-Speech, Contrast & Font Scale
// WCAG 2.2 AA / AAA Compliance Assistant

class MindBridgeSpeech {
    constructor() {
        this.synth = window.speechSynthesis || null;
        this.currentUtterance = null;
        this.isPaused = false;
        this.activeButton = null;
        this.init();
    }

    init() {
        if (!this.synth) {
            console.warn('Web Speech API is not supported in this browser.');
            return;
        }

        // Apply saved font scale
        const savedFontScale = localStorage.getItem('fontScale') || 'normal';
        this.applyFontScale(savedFontScale);

        // Bind interactive TTS buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-tts-target], .btn-tts');
            if (btn) {
                e.preventDefault();
                this.handleTTSClick(btn);
            }
        });
    }

    handleTTSClick(btn) {
        if (this.synth.speaking && !this.synth.paused) {
            if (this.activeButton === btn) {
                // Pause current
                this.synth.pause();
                this.isPaused = true;
                this.updateButtonState(btn, 'paused');
                return;
            } else {
                // Stop previous and start new
                this.stop();
            }
        } else if (this.synth.paused && this.activeButton === btn) {
            // Resume
            this.synth.resume();
            this.isPaused = false;
            this.updateButtonState(btn, 'playing');
            return;
        }

        const targetId = btn.getAttribute('data-tts-target');
        let textToRead = '';
        if (targetId) {
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                textToRead = targetEl.innerText || targetEl.textContent;
            }
        } else {
            textToRead = btn.getAttribute('data-tts-text') || '';
        }

        if (textToRead.trim()) {
            this.speak(textToRead, btn);
        }
    }

    speak(text, btn = null) {
        if (!this.synth) return;
        this.stop();

        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.rate = parseFloat(localStorage.getItem('ttsRate') || '1.0');
        this.currentUtterance.pitch = 1.0;

        this.activeButton = btn;
        if (btn) this.updateButtonState(btn, 'playing');

        this.currentUtterance.onend = () => {
            if (btn) this.updateButtonState(btn, 'idle');
            this.activeButton = null;
            this.isPaused = false;
        };

        this.currentUtterance.onerror = (e) => {
            console.error('Speech error:', e);
            if (btn) this.updateButtonState(btn, 'idle');
            this.activeButton = null;
            this.isPaused = false;
        };

        this.synth.speak(this.currentUtterance);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
            if (this.activeButton) {
                this.updateButtonState(this.activeButton, 'idle');
            }
            this.activeButton = null;
            this.isPaused = false;
        }
    }

    updateButtonState(btn, state) {
        const icon = btn.querySelector('.tts-icon');
        const textSpan = btn.querySelector('.tts-label');

        if (state === 'playing') {
            btn.classList.add('bg-brand', 'text-white');
            if (textSpan) textSpan.textContent = 'Pause Reading';
            if (icon) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6"/>';
            }
        } else if (state === 'paused') {
            btn.classList.remove('bg-brand', 'text-white');
            if (textSpan) textSpan.textContent = 'Resume Reading';
            if (icon) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>';
            }
        } else {
            btn.classList.remove('bg-brand', 'text-white');
            if (textSpan) textSpan.textContent = 'Read Aloud';
            if (icon) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>';
            }
        }
    }

    applyFontScale(scale) {
        document.documentElement.classList.remove('text-scale-normal', 'text-scale-large', 'text-scale-xlarge');
        if (scale === 'large') {
            document.documentElement.classList.add('text-scale-large');
            document.documentElement.style.fontSize = '18px';
        } else if (scale === 'xlarge') {
            document.documentElement.classList.add('text-scale-xlarge');
            document.documentElement.style.fontSize = '20px';
        } else {
            document.documentElement.classList.add('text-scale-normal');
            document.documentElement.style.fontSize = '16px';
        }
        localStorage.setItem('fontScale', scale);
    }
}

// Global instance
window.MindBridgeSpeechInstance = new MindBridgeSpeech();
