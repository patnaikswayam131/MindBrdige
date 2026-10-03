// Dark Mode Toggle Functionality

// Every light/dark checkbox on the site. `checked` always means LIGHT theme.
const THEME_CHECKBOX_SELECTOR = '#darkModeCheckbox, .theme-toggle .checkbox, .switch input[type="checkbox"]';

class DarkModeToggle {
    constructor() {
        this.init();
    }

    init() {
        // Check for saved theme preference or default to 'light' mode
        let currentTheme = localStorage.getItem('theme');
        
        if (!currentTheme) {
            // Check for system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                currentTheme = 'dark';
            } else {
                currentTheme = 'light';
            }
        }

        this.applyTheme(currentTheme);
        this.setupToggleButton();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        this.updateToggleButton(theme);
    }

    toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    setupToggleButton() {
        // 1. Setup Custom Day/Night Switch Checkboxes
        const checkboxes = document.querySelectorAll(THEME_CHECKBOX_SELECTOR);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                // Checked = Day/Light mode, Unchecked = Night/Dark mode
                const newTheme = e.target.checked ? 'light' : 'dark';
                this.applyTheme(newTheme);
            });
        });

        // 2. Setup Legacy Buttons if any exist
        const buttons = document.querySelectorAll('button#darkModeToggle');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.toggleTheme());
        });
    }

    updateToggleButton(theme) {
        const currentTheme = theme || localStorage.getItem('theme') || 'light';
        
        // Synchronize all custom switch checkboxes
        const checkboxes = document.querySelectorAll(THEME_CHECKBOX_SELECTOR);
        checkboxes.forEach(checkbox => {
            checkbox.checked = (currentTheme === 'light');
        });

        // Keep the accessible name of the navbar toggle in sync with the
        // current theme so screen readers announce the right action.
        // The checkbox is a SIBLING of the label, not a descendant, so
        // it has to be resolved from the .theme-toggle container.
        document.querySelectorAll('.theme-toggle').forEach((toggle) => {
            const input = toggle.querySelector('.checkbox');
            const label = toggle.querySelector('.switch-label');
            if (!input || !label) return;
            const action = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
            label.setAttribute('title', action);
            label.setAttribute('aria-label', action);
            input.setAttribute('aria-label', action);
            const sr = label.querySelector('.sr-only');
            if (sr) sr.textContent = action;
        });

        // Synchronize legacy button icons if present
        const toggleButton = document.querySelector('button#darkModeToggle');
        const darkModeIcon = document.getElementById('darkModeIcon');
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');

        if (toggleButton) {
            toggleButton.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }

        if (sunIcon && moonIcon) {
            if (currentTheme === 'dark') {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }

        if (darkModeIcon) {
            if (currentTheme === 'dark') {
                darkModeIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                `;
            } else {
                darkModeIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                `;
            }
        }
    }
}

// Immediate execution to prevent flash of wrong theme and contrast
(function() {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
        }

        const savedContrast = localStorage.getItem('contrast');
        if (savedContrast === 'high') {
            document.documentElement.setAttribute('data-contrast', 'high');
        }
    } catch (e) {
        console.error('Error applying theme/contrast early:', e);
    }
})();

function applyContrast(contrast) {
    if (contrast === 'high') {
        document.documentElement.setAttribute('data-contrast', 'high');
        localStorage.setItem('contrast', 'high');
    } else {
        document.documentElement.removeAttribute('data-contrast');
        localStorage.setItem('contrast', 'normal');
    }
}
window.applyContrast = applyContrast;

// Initialize dark mode when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DarkModeToggle();
    });
} else {
    new DarkModeToggle();
}

// Handle system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            const checkboxes = document.querySelectorAll(THEME_CHECKBOX_SELECTOR);
            checkboxes.forEach(cb => {
                cb.checked = (newTheme === 'light');
            });
        }
    });
}
