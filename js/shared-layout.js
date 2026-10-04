// MindBridge Shared Layout & Navigation Controller
// Standardizes Unified Navigation, Persistent Static Header, and Seamless Page Transitions

(function() {
    let isTransitioning = false;

    function getNormalizedPageName(pathname) {
        let name = pathname.split('/').pop() || 'landing.html';
        if (name === '' || name === 'index.html') name = 'landing.html';
        return name;
    }

    // Sanitize user-supplied strings before DOM insertion
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function initSharedLayout() {
        const currentPage = getNormalizedPageName(window.location.pathname);
        let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

        // If on student_dashboard and no currentUser is found, initialize a demo student so profile icon works immediately
        if (!currentUser && currentPage === 'student_dashboard.html') {
            currentUser = {
                firstName: 'Student',
                lastName: '',
                email: 'student@university.edu',
                role: 'student'
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        // Standardize header navbar classes to always be constant and sticky
        const header = document.querySelector('header.navbar');
        if (header) {
            header.className = 'navbar bg-surface/80 backdrop-blur-md sticky top-0 z-50 transition-colors';
        }

        // ==========================================
        // 1. POPULATE MAIN & MOBILE NAVIGATION
        // ==========================================
        const mainNavLinks = document.getElementById('main-nav-links');
        const mobileNavLinks = document.getElementById('mobile-nav-links');

        const loggedOutLinks = [
            { href: 'landing.html#approach', text: 'Our Approach', page: 'landing.html' },
            { href: 'landing.html#services', text: 'Services', page: 'landing.html' },
            { href: 'resources.html', text: 'Resources', page: 'resources.html' },
            { href: 'landing.html#about', text: 'About', page: 'landing.html' }
        ];

        const loggedInStudentLinks = [
            { href: 'student_dashboard.html', text: 'Dashboard', page: 'student_dashboard.html' },
            { href: 'resources.html', text: 'Resources', page: 'resources.html' },
            { href: 'communities.html', text: 'Communities', page: 'communities.html' },
            { href: 'journal.html', text: 'Journal', page: 'journal.html' },
            { href: 'mental_health_assessments.html', text: 'Assessments', page: 'mental_health_assessments.html' },
            { href: 'counselor_appointment_booking.html', text: 'Appointments', page: 'counselor_appointment_booking.html' },
            { href: 'ai_mental_health_chatbot.html', text: 'MIRA Chat', page: 'ai_mental_health_chatbot.html' }
        ];

        const adminLinks = [
            { href: 'admin_analytics_dashboard.html', text: 'Analytics Dashboard', page: 'admin_analytics_dashboard.html' },
            { href: 'student_dashboard.html', text: 'Student View', page: 'student_dashboard.html' },
            { href: 'resources.html', text: 'Resources', page: 'resources.html' },
            { href: 'communities.html', text: 'Communities', page: 'communities.html' }
        ];

        const counselorLinks = [
            { href: 'counselor_dashboard.html', text: 'Counselor Dashboard', page: 'counselor_dashboard.html' },
            { href: 'counselor_appointment_booking.html', text: 'Appointments', page: 'counselor_appointment_booking.html' },
            { href: 'resources.html', text: 'Resources', page: 'resources.html' },
            { href: 'communities.html', text: 'Communities', page: 'communities.html' }
        ];

        let linksToUse = loggedOutLinks;
        if (currentUser) {
            if (currentUser.role === 'admin') linksToUse = adminLinks;
            else if (currentUser.role === 'counselor') linksToUse = counselorLinks;
            else linksToUse = loggedInStudentLinks;
        }

        const currentHash = window.location.hash || '';
        if (mainNavLinks) {
            mainNavLinks.innerHTML = linksToUse.map(link => {
                let isCurrent = false;
                if (link.href.includes('#')) {
                    const linkHash = '#' + link.href.split('#')[1];
                    isCurrent = (currentPage === link.page) && (currentHash === linkHash || (!currentHash && linkHash === '#approach'));
                } else {
                    isCurrent = (currentPage === link.page) && !currentHash;
                }
                const isActive = isCurrent ? 'active font-semibold text-text' : 'text-text-secondary hover:text-text';
                return `<li><a href="${link.href}" class="nav-link text-body-s font-medium transition-colors ${isActive}">${link.text}</a></li>`;
            }).join('');
        }

        if (mobileNavLinks) {
            mobileNavLinks.innerHTML = linksToUse.map(link => {
                let isCurrent = false;
                if (link.href.includes('#')) {
                    const linkHash = '#' + link.href.split('#')[1];
                    isCurrent = (currentPage === link.page) && (currentHash === linkHash || (!currentHash && linkHash === '#approach'));
                } else {
                    isCurrent = (currentPage === link.page) && !currentHash;
                }
                const isActive = isCurrent ? 'text-primary font-bold bg-secondary/50' : 'text-text-secondary hover:text-primary';
                return `<a href="${link.href}" class="px-3 py-2 rounded-lg font-medium text-body-m transition-colors ${isActive}">${link.text}</a>`;
            }).join('');
        }

        // ==========================================
        // 2. AUTH & USER PROFILE DROPDOWN
        // ==========================================
        const authActions = document.getElementById('auth-actions');
        const mobileAuthActions = document.getElementById('mobile-auth-actions');
        const userProfileMenu = document.getElementById('user-profile-menu');
        const profileBtn = document.getElementById('profile-btn');
        const profileDropdown = document.getElementById('profile-dropdown');
        const profileInitials = document.getElementById('profile-initials');

        if (currentUser) {
            if (authActions) {
                authActions.classList.remove('sm:flex', 'flex');
                authActions.classList.add('hidden');
                authActions.style.setProperty('display', 'none', 'important');
            }
            if (mobileAuthActions) {
                mobileAuthActions.classList.add('hidden');
                mobileAuthActions.style.setProperty('display', 'none', 'important');
            }
            if (userProfileMenu) {
                userProfileMenu.classList.remove('hidden');
                userProfileMenu.classList.add('flex');
                userProfileMenu.style.setProperty('display', 'flex', 'important');
            }
            const initial = currentUser.firstName ? currentUser.firstName.charAt(0).toUpperCase() : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U');
            if (profileInitials) profileInitials.textContent = initial;

            // Role badge text & styling (Vector SVGs - No Emojis)
            let roleBadge = '<span class="inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> Student Account</span>';
            if (currentUser.role === 'admin') roleBadge = '<span class="inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Campus Administrator</span>';
            else if (currentUser.role === 'counselor') roleBadge = '<span class="inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 3v5a5.5 5.5 0 0 0 11 0V3"/><path d="M4.5 5h3"/><path d="M12.5 5h3"/><path d="M10 13.5v3.5a3 3 0 0 0 6 0V14"/><circle cx="18" cy="14" r="2"/></svg> Licensed Counselor</span>';

            // Role-specific profile dropdown items
            let roleSpecificItems = '';
            if (currentUser.role === 'admin') {
                roleSpecificItems = `
                    <a href="admin_analytics_dashboard.html" class="px-5 py-3 hover:bg-surface-soft text-body-m text-text border-b border-border flex items-center gap-3 transition-colors">
                        <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                        Analytics Dashboard
                    </a>
                    <a href="student_dashboard.html" class="px-5 py-3 hover:bg-surface-soft text-body-m text-text border-b border-border flex items-center gap-3 transition-colors">
                        <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        Student View (Preview)
                    </a>
                `;
            } else if (currentUser.role === 'counselor') {
                roleSpecificItems = `
                    <a href="counselor_dashboard.html" class="px-5 py-3 hover:bg-surface-soft text-body-m text-text border-b border-border flex items-center gap-3 transition-colors">
                        <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        Counselor Dashboard
                    </a>
                    <a href="counselor_appointment_booking.html" class="px-5 py-3 hover:bg-surface-soft text-body-m text-text border-b border-border flex items-center gap-3 transition-colors">
                        <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        Appointment Schedule
                    </a>
                `;
            } else {
                roleSpecificItems = `
                    <a href="student_dashboard.html" class="px-5 py-3 hover:bg-surface-soft text-body-m text-text border-b border-border flex items-center gap-3 transition-colors">
                        <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                        Dashboard
                    </a>
                    <a href="journal.html" class="px-5 py-3 hover:bg-surface-soft text-body-m text-text border-b border-border flex items-center gap-3 transition-colors">
                        <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                        Private Journal
                    </a>
                `;
            }

            // Standardize Profile Dropdown contents
            if (profileDropdown) {
                profileDropdown.innerHTML = `
                    <div class="px-5 py-3 border-b border-border bg-surface-soft/60">
                        <p class="text-[11px] font-bold uppercase tracking-wider text-brand mb-0.5">${roleBadge}</p>
                        <p class="text-body-s font-semibold text-text truncate">${escapeHtml(currentUser.firstName ? currentUser.firstName + (currentUser.lastName ? ' ' + currentUser.lastName : '') : currentUser.email)}</p>
                        <p class="text-caption text-text-secondary truncate">${escapeHtml(currentUser.email)}</p>
                    </div>
                    ${roleSpecificItems}
                    <a href="settings.html" class="px-5 py-3 hover:bg-surface-soft text-body-m text-text border-b border-border flex items-center gap-3 transition-colors">
                        <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Settings & Preferences
                    </a>
                    <a href="#" id="global-logout-btn" class="px-5 py-3 hover:bg-error/10 text-body-m text-error font-medium flex items-center gap-3 transition-colors">
                        <svg class="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        Sign Out
                    </a>
                `;

                const logoutBtn = document.getElementById('global-logout-btn');
                if (logoutBtn) {
                    logoutBtn.onclick = (e) => {
                        e.preventDefault();
                        const wasAdmin = currentUser && currentUser.role === 'admin';
                        localStorage.removeItem('currentUser');
                        window.location.href = wasAdmin ? 'student_login.html?role=admin' : 'student_login.html';
                    };
                }
            }
        } else {
            // Logged out view: Show Admin Portal + Sign In + Get Started
            if (authActions) {
                authActions.classList.remove('hidden');
                authActions.classList.add('sm:flex');
                authActions.style.removeProperty('display');
                authActions.innerHTML = `
                    <a href="student_login.html?role=admin" class="text-caption font-bold text-text-secondary hover:text-brand transition-colors px-2.5 py-1.5 rounded-lg hover:bg-surface-soft whitespace-nowrap">Admin Portal</a>
                    <a href="student_login.html" class="nav-link whitespace-nowrap">Sign In</a>
                    <a href="student_login.html" class="btn-primary nav-btn whitespace-nowrap min-w-[120px]">Get Started</a>
                `;
            }
            if (mobileAuthActions) {
                mobileAuthActions.classList.remove('hidden');
                mobileAuthActions.style.removeProperty('display');
                mobileAuthActions.innerHTML = `
                    <a href="student_login.html" class="btn-primary w-full justify-center flex">Sign In</a>
                    <a href="student_login.html?role=admin" class="btn-secondary w-full justify-center flex text-body-s">Admin Portal</a>
                `;
            }
            if (userProfileMenu) {
                userProfileMenu.classList.add('hidden');
                userProfileMenu.classList.remove('flex');
                userProfileMenu.style.setProperty('display', 'none', 'important');
            }
        }

        // Robust, clean toggle for Profile Button (zero conflict)
        if (profileBtn && profileDropdown) {
            profileBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                const isHidden = profileDropdown.classList.contains('hidden');
                if (isHidden) {
                    profileDropdown.classList.remove('hidden');
                    profileDropdown.classList.add('flex');
                } else {
                    profileDropdown.classList.add('hidden');
                    profileDropdown.classList.remove('flex');
                }
            };
        }

        // Global click-outside listener to close dropdown
        document.addEventListener('click', function(e) {
            if (profileDropdown && !profileDropdown.classList.contains('hidden')) {
                if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
                    profileDropdown.classList.add('hidden');
                    profileDropdown.classList.remove('flex');
                }
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.onclick = function(e) {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            };
        }

        // ==========================================
        // 3. INJECT RESTORED GLOBAL FOOTER
        // ==========================================
        const isChatOrOnboarding = (currentPage === 'ai_mental_health_chatbot.html' || currentPage === 'onboarding.html');
        const existingFooter = document.getElementById('globalFooter');

        if (isChatOrOnboarding) {
            if (existingFooter) {
                existingFooter.style.display = 'none';
            }
        } else {
            if (existingFooter) {
                existingFooter.style.display = '';
            } else {
                const legacyFooter = document.querySelector('footer:not(#globalFooter)');
                const footerContainer = document.createElement('footer');
                footerContainer.id = 'globalFooter';
                footerContainer.className = 'bg-surface border-t border-border mt-auto py-16 transition-colors';
                footerContainer.innerHTML = `
                <div class="w-full mx-auto max-w-[var(--content-width,1440px)] px-[var(--content-padding,24px)]">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                        <!-- Brand Column -->
                        <div class="lg:col-span-2 space-y-4">
                            <div class="flex items-center space-x-3">
                                <img src="../images/logo_light.png" class="w-8 h-8 dark:hidden" alt="MindBridge Logo">
                                <img src="../images/logo_dark.png" class="w-8 h-8 hidden dark:block" alt="MindBridge Logo">
                                <span class="text-h4 font-display text-text">MindBridge</span>
                            </div>
                            <p class="text-body-s text-text-secondary max-w-sm">
                                A confidential, student-centered emotional well-being platform integrating compassionate AI, peer community, structured self-reflection, and licensed counseling.
                            </p>
                            <div class="inline-flex items-center gap-2 p-2 px-3 bg-error/10 border border-error/20 rounded-full text-caption text-error font-medium">
                                <span class="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                                24/7 Crisis Hotline: <a href="tel:1800-599-0019" class="font-bold underline hover:opacity-80">1800-599-0019</a> or text <a href="tel:988" class="font-bold underline hover:opacity-80">988</a>
                            </div>
                        </div>

                        <!-- Core Features -->
                        <div>
                            <h3 class="text-label text-text font-bold uppercase tracking-wider mb-4">Explore</h3>
                            <ul class="space-y-2.5 text-body-s">
                                <li><a href="student_dashboard.html" class="text-text-secondary hover:text-brand transition-colors">Student Dashboard</a></li>
                                <li><a href="resources.html" class="text-text-secondary hover:text-brand transition-colors">Resource Library</a></li>
                                <li><a href="communities.html" class="text-text-secondary hover:text-brand transition-colors">Peer Communities</a></li>
                                <li><a href="journal.html" class="text-text-secondary hover:text-brand transition-colors">Private Journal</a></li>
                                <li><a href="ai_mental_health_chatbot.html" class="text-text-secondary hover:text-brand transition-colors">MIRA AI Companion</a></li>
                                <li><a href="mental_health_assessments.html" class="text-text-secondary hover:text-brand transition-colors">Clinical Screeners</a></li>
                                <li><a href="counselor_appointment_booking.html" class="text-text-secondary hover:text-brand transition-colors">Book a Counselor</a></li>
                            </ul>
                        </div>

                        <!-- Institutional & Support -->
                        <div>
                            <h3 class="text-label text-text font-bold uppercase tracking-wider mb-4">Administration</h3>
                            <ul class="space-y-2.5 text-body-s">
                                <li><a href="student_login.html?role=admin" class="text-brand font-semibold hover:underline transition-colors flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> Admin Portal Login</a></li>
                                <li><a href="admin_analytics_dashboard.html" class="text-text-secondary hover:text-brand transition-colors">Campus Analytics Dashboard</a></li>
                                <li><a href="counselor_dashboard.html" class="text-text-secondary hover:text-brand transition-colors">Counselor Portal</a></li>
                                <li><a href="landing.html#approach" class="text-text-secondary hover:text-brand transition-colors">Our Approach</a></li>
                                <li><a href="settings.html" class="text-text-secondary hover:text-brand transition-colors">Platform Settings</a></li>
                            </ul>
                        </div>

                        <!-- Policies & Legal -->
                        <div>
                            <h3 class="text-label text-text font-bold uppercase tracking-wider mb-4">Privacy & Legal</h3>
                            <ul class="space-y-2.5 text-body-s">
                                <li><a href="privacy_policy.html" class="text-text-secondary hover:text-brand transition-colors">Privacy Policy</a></li>
                                <li><a href="terms_of_service.html" class="text-text-secondary hover:text-brand transition-colors">Terms of Service</a></li>
                                <li><a href="settings.html#privacy" class="text-text-secondary hover:text-brand transition-colors">Data Export & Deletion</a></li>
                                <li><a href="settings.html#accessibility" class="text-text-secondary hover:text-brand transition-colors">Accessibility Statement</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Bottom Bar -->
                    <div class="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                        <p class="text-caption text-text-muted text-center md:text-left">
                            © 2026 MindBridge. All rights reserved. MindBridge is a mental health support platform and not an emergency medical service. In life-threatening emergencies, call 911 or 988 immediately.
                        </p>
                        <div class="flex items-center gap-4 text-caption text-text-secondary">
                            <span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> Encrypted & Confidential</span>
                            <span>•</span>
                            <span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> WCAG 2.2 AA</span>
                        </div>
                    </div>
                </div>
            `;
            if (legacyFooter) {
                legacyFooter.replaceWith(footerContainer);
            } else {
                document.body.appendChild(footerContainer);
            }
        }
    }
    }

    // ==========================================
    // 4. SEAMLESS SPA TRANSITIONS (CONSTANT HEADER)
    // Keeps the header mounted permanently in the DOM
    // without flickering or reloading every page switch
    // ==========================================
    function setupSeamlessNavigation() {
        if (window._mbSeamlessNavInitialized) return;
        window._mbSeamlessNavInitialized = true;

        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            if (link.target === '_blank' || link.hasAttribute('download')) return;

            // Only intercept local HTML page links
            let targetUrl;
            try {
                targetUrl = new URL(href, window.location.href);
            } catch (err) {
                return;
            }

            if (targetUrl.origin !== window.location.origin) return;

            // Intercept internal page transitions
            const targetPage = getNormalizedPageName(targetUrl.pathname);
            const thisPage = getNormalizedPageName(window.location.pathname);

            // If it's a hash link on the current page, smooth-scroll and update active indicator
            if (targetPage === thisPage && targetUrl.hash) {
                const targetEl = document.querySelector(targetUrl.hash);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', targetUrl.hash);
                    initSharedLayout();
                    return;
                }
            }

            const standardPages = [
                'landing.html', 'student_dashboard.html', 'resources.html',
                'communities.html', 'journal.html', 'mental_health_assessments.html',
                'counselor_appointment_booking.html', 'ai_mental_health_chatbot.html',
                'settings.html', 'privacy_policy.html', 'terms_of_service.html',
                'counselor_dashboard.html', 'admin_analytics_dashboard.html'
            ];

            if (standardPages.includes(targetPage)) {
                e.preventDefault();
                navigateSeamlessly(targetUrl.href, true);
            }
        });

        window.addEventListener('hashchange', function() {
            initSharedLayout();
        });

        window.addEventListener('popstate', function() {
            navigateSeamlessly(window.location.href, false);
        });
    }

    async function navigateSeamlessly(url, pushState = true) {
        if (isTransitioning) return;
        isTransitioning = true;

        if (window.MindBridgeSkeleton) {
            window.MindBridgeSkeleton.showProgress();
        }

        const mainContainer = document.querySelector('main');
        if (!mainContainer) {
            window.location.href = url;
            return;
        }

        try {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Exit animation — GSAP if available, CSS fallback otherwise
            if (!prefersReducedMotion && window.gsap) {
                await new Promise(resolve => {
                    gsap.to(mainContainer, {
                        opacity: 0.3,
                        y: 6,
                        duration: 0.18,
                        ease: 'power2.in',
                        onComplete: resolve
                    });
                });
            } else if (!prefersReducedMotion) {
                mainContainer.style.transition = 'opacity 160ms ease-out, transform 160ms ease-out';
                mainContainer.style.opacity = '0.3';
                mainContainer.style.transform = 'translateY(6px)';
                await new Promise(r => setTimeout(r, 170));
            }

            const response = await fetch(url, { headers: { 'X-Requested-With': 'MindBridge-SPA' } });
            if (!response.ok) throw new Error('Network error: ' + response.status);

            const htmlText = await response.text();
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(htmlText, 'text/html');

            const newMain = newDoc.querySelector('main');
            if (!newMain) {
                window.location.href = url;
                return;
            }

            // Update title
            if (newDoc.title) {
                document.title = newDoc.title;
            }

            // Push history
            if (pushState) {
                window.history.pushState({ path: url }, '', url);
            }

            // Replace <main> inner content & attributes
            mainContainer.innerHTML = newMain.innerHTML;
            mainContainer.className = newMain.className;
            if (newDoc.body && newDoc.body.className) {
                document.body.className = newDoc.body.className;
            }

            // Parse target page name from the URL
            let parsedUrl;
            try { parsedUrl = new URL(url, window.location.href); } catch(e) { parsedUrl = { pathname: url }; }
            const navPageName = getNormalizedPageName(parsedUrl.pathname);
            const footerEl = document.getElementById('globalFooter');
            if (footerEl) {
                footerEl.style.display = (navPageName === 'ai_mental_health_chatbot.html' || navPageName === 'onboarding.html') ? 'none' : '';
            }

            // Re-execute any page-specific inline scripts from the fetched page
            const scripts = newDoc.querySelectorAll('body script');
            scripts.forEach(script => {
                const src = script.getAttribute('src');
                if (src && (src.includes('shared-layout.js') || src.includes('dark-mode.js') || src.includes('accessibility.js') || src.includes('icons.js') || src.includes('skeleton-loader.js'))) {
                    return; // Skip global scripts
                }
                const newScript = document.createElement('script');
                if (src) {
                    newScript.src = src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
            });

            // Smooth fade back in
            window.scrollTo({ top: 0, behavior: 'instant' });
            if (!prefersReducedMotion && window.gsap) {
                gsap.fromTo(mainContainer,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'all' }
                );
            } else if (!prefersReducedMotion) {
                mainContainer.style.opacity = '0';
                mainContainer.style.transform = 'translateY(10px)';
                mainContainer.classList.add('page-fade-enter');
                requestAnimationFrame(() => {
                    mainContainer.style.transition = 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
                    mainContainer.style.opacity = '1';
                    mainContainer.style.transform = 'translateY(0)';
                    setTimeout(() => mainContainer.classList.remove('page-fade-enter'), 350);
                });
            } else {
                mainContainer.style.opacity = '1';
                mainContainer.style.transform = 'none';
            }

            // Re-run shared layout to update active nav state without recreating the header!
            initSharedLayout();

            // Dispatch global event for page charts or components that need re-init
            window.dispatchEvent(new Event('DOMContentLoaded'));
            window.dispatchEvent(new Event('load'));
            window.dispatchEvent(new CustomEvent('mindbridge:pagechange', { detail: { url } }));

        } catch (err) {
            console.warn('Seamless navigation failed, falling back to standard load:', err);
            window.location.href = url;
        } finally {
            if (window.MindBridgeSkeleton) {
                window.MindBridgeSkeleton.completeProgress();
            }
            isTransitioning = false;
        }
    }

    // Run on startup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSharedLayout();
            setupSeamlessNavigation();
        });
    } else {
        initSharedLayout();
        setupSeamlessNavigation();
    }
})();
