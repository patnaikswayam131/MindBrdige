# PowerShell Script to Add Dark Mode Support to All HTML Pages

# Dark Mode CSS styles to insert
$darkModeCSS = @"
    <style>
        /* Dark Mode CSS Variables */
        :root {
            --bg-primary: #ffffff;
            --bg-secondary: #f8fafc;
            --bg-surface: #ffffff;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --border-light: #e2e8f0;
            --primary-50: #eff6ff;
            --primary-500: #3b82f6;
            --secondary-50: #f8fafc;
            --secondary-500: #6366f1;
            --secondary-600: #4f46e5;
            --accent: #10b981;
            --error: #ef4444;
        }
        
        [data-theme="dark"] {
            --bg-primary: #0f172a;
            --bg-secondary: #1e293b;
            --bg-surface: #334155;
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
            --border-light: #475569;
            --primary-50: #1e293b;
            --primary-500: #60a5fa;
            --secondary-50: #1e293b;
            --secondary-500: #818cf8;
            --secondary-600: #6366f1;
            --accent: #34d399;
            --error: #f87171;
        }
        
        body {
            background-color: var(--bg-primary);
            color: var(--text-primary);
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .card-surface {
            background-color: var(--bg-surface);
            border-color: var(--border-light);
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        
        .bg-white\/50 {
            background-color: var(--bg-secondary) !important;
        }
        
        .text-text-primary {
            color: var(--text-primary) !important;
        }
        
        .text-text-secondary {
            color: var(--text-secondary) !important;
        }
        
        .border-border-light {
            border-color: var(--border-light) !important;
        }
        
        .dark-mode-toggle {
            background: var(--bg-surface);
            border: 1px solid var(--border-light);
            color: var(--text-primary);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .dark-mode-toggle:hover {
            background: var(--primary-50);
            border-color: var(--primary-500);
            transform: scale(1.05);
        }
        
        .dark-mode-toggle svg {
            width: 20px;
            height: 20px;
            transition: all 0.3s ease;
        }
    </style>
"@

# Dark Mode Toggle Button HTML
$darkModeToggleButton = @"
                    <!-- Dark Mode Toggle -->
                    <button id="darkModeToggle" class="dark-mode-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
                        <svg id="sunIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <svg id="moonIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                        </svg>
                    </button>
                    
"@

# Dark Mode Script Include
$darkModeScript = @"
    
    <!-- Dark Mode Script -->
    <script src="../js/dark-mode.js"></script>
"@

# Get all HTML files in pages directory
$htmlFiles = Get-ChildItem -Path ".\pages" -Filter "*.html"

Write-Host "Found $($htmlFiles.Count) HTML files to update"

foreach ($file in $htmlFiles) {
    # Skip landing.html and student_login.html as they're already updated
    if ($file.Name -eq "landing.html" -or $file.Name -eq "student_login.html") {
        Write-Host "Skipping $($file.Name) - already updated"
        continue
    }
    
    Write-Host "Processing $($file.Name)..."
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Add dark mode CSS after the </script> tag in head
    if ($content -match '</script>(\s*)</head>') {
        $content = $content -replace '</script>(\s*)</head>', "</script>$darkModeCSS`$1</head>"
        Write-Host "  - Added dark mode CSS"
    }
    
    # Add dark mode toggle button before crisis helpline
    # Look for patterns where crisis helpline appears
    if ($content -match '(<div[^>]*>[\s\S]*?)(Crisis[^<]*</a>[\s\S]*?</div>)') {
        $beforeCrisis = $matches[1]
        $crisisSection = $matches[2]
        $replacement = $beforeCrisis + $darkModeToggleButton + $crisisSection
        $content = $content -replace '(<div[^>]*>[\s\S]*?)(Crisis[^<]*</a>[\s\S]*?</div>)', $replacement
        Write-Host "  - Added dark mode toggle button"
    }
    
    # Add dark mode script before closing </body> tag
    if ($content -match '</body>') {
        $content = $content -replace '</body>', "$darkModeScript`n</body>"
        Write-Host "  - Added dark mode script"
    }
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "  - Updated $($file.Name) successfully"
}

Write-Host "`nDark mode support has been added to all HTML pages!"
