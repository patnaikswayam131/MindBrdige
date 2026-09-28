// Dark Mode Toggle Functionality
class DarkModeToggle {
    constructor() {
        this.init();
    }

    init() {
        // Check for saved theme preference or default to 'light' mode
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            if (currentTheme === 'dark') {
                document.documentElement.classList.add('dark');
            }
        } else {
            // Check for system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        }

        this.setupToggleButton();
        this.updateToggleButton();
    }

    setupToggleButton() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const currentTheme = localStorage.getItem('theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        this.updateToggleButton();
        this.animateToggle();
    }

    updateToggleButton() {
        const toggleButton = document.getElementById('darkModeToggle');
        const darkModeIcon = document.getElementById('darkModeIcon');
        
        if (!toggleButton) return;
        
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark') {
            toggleButton.setAttribute('aria-label', 'Switch to light mode');
            if (darkModeIcon) {
                darkModeIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                `;
            }
        } else {
            toggleButton.setAttribute('aria-label', 'Switch to dark mode');
            if (darkModeIcon) {
                darkModeIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                `;
            }
        }
    }

    animateToggle() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (toggleButton) {
            toggleButton.style.transform = 'scale(0.9)';
            toggleButton.style.opacity = '0.5';
            setTimeout(() => {
                toggleButton.style.transform = 'scale(1)';
                toggleButton.style.opacity = '1';
            }, 150);
        }
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
});

// Handle system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                document.documentElement.classList.remove('dark');
            }
        }
    });
}
