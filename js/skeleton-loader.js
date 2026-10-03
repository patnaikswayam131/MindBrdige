// MindBridge Minimalist Loading & Skeleton System
// Eliminates empty flashes and jarring layout shifts across all asynchronous views.

window.MindBridgeSkeleton = {
    // Shows a subtle top progress bar for route/async transitions
    showProgress() {
        let bar = document.getElementById('pageProgressBar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'pageProgressBar';
            document.body.appendChild(bar);
        }
        bar.style.opacity = '1';
        bar.style.width = '30%';
        setTimeout(() => {
            if (bar && bar.style.opacity !== '0') bar.style.width = '75%';
        }, 120);
    },

    completeProgress() {
        const bar = document.getElementById('pageProgressBar');
        if (!bar) return;
        bar.style.width = '100%';
        setTimeout(() => {
            bar.style.opacity = '0';
            setTimeout(() => {
                bar.style.width = '0%';
            }, 200);
        }, 150);
    },

    // Generates a responsive resource / content card skeleton
    cardGrid(count = 3) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="skeleton-card card-elevated p-6 flex flex-col justify-between h-64 animate-pulse">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <div class="skeleton-shimmer skeleton-badge w-20 h-6"></div>
                            <div class="skeleton-shimmer w-6 h-6 rounded-full"></div>
                        </div>
                        <div class="skeleton-shimmer skeleton-title w-3/4 mb-3"></div>
                        <div class="skeleton-shimmer skeleton-text w-full mb-2"></div>
                        <div class="skeleton-shimmer skeleton-text w-4/5 mb-2"></div>
                    </div>
                    <div class="flex items-center justify-between pt-4 border-t border-border/50">
                        <div class="skeleton-shimmer w-16 h-4 rounded"></div>
                        <div class="skeleton-shimmer w-20 h-8 rounded-lg"></div>
                    </div>
                </div>
            `;
        }
        return html;
    },

    // Generates community discussion thread skeleton
    communityFeed(count = 3) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="skeleton-card card-elevated p-6 mb-4 animate-pulse">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="skeleton-shimmer skeleton-avatar w-10 h-10"></div>
                        <div class="space-y-1.5 flex-1">
                            <div class="skeleton-shimmer skeleton-text w-32 h-4 mb-0"></div>
                            <div class="skeleton-shimmer skeleton-text w-20 h-3 mb-0"></div>
                        </div>
                        <div class="skeleton-shimmer skeleton-badge w-24 h-6"></div>
                    </div>
                    <div class="skeleton-shimmer skeleton-title w-2/3 mb-3"></div>
                    <div class="skeleton-shimmer skeleton-text w-full mb-2"></div>
                    <div class="skeleton-shimmer skeleton-text w-5/6 mb-4"></div>
                    <div class="flex items-center gap-3 pt-3 border-t border-border/50">
                        <div class="skeleton-shimmer w-16 h-7 rounded-lg"></div>
                        <div class="skeleton-shimmer w-16 h-7 rounded-lg"></div>
                        <div class="skeleton-shimmer w-16 h-7 rounded-lg"></div>
                    </div>
                </div>
            `;
        }
        return html;
    },

    // Generates journal entry list skeleton
    journalEntries(count = 3) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="p-4 rounded-xl border border-border bg-surface mb-3 animate-pulse">
                    <div class="flex justify-between items-center mb-2">
                        <div class="skeleton-shimmer w-20 h-3 rounded"></div>
                        <div class="skeleton-shimmer w-14 h-4 rounded-full"></div>
                    </div>
                    <div class="skeleton-shimmer w-3/4 h-4 rounded mb-2"></div>
                    <div class="skeleton-shimmer w-full h-3 rounded"></div>
                </div>
            `;
        }
        return html;
    }
};
