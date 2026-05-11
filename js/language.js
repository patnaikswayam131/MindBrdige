(function() {
    // Add Google Translate script
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(gtScript);

    // Add hidden div for Google Translate
    const gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.style.display = 'none';
    
    // Make sure body exists
    if(document.body) {
        document.body.appendChild(gtDiv);
    } else {
        window.addEventListener('DOMContentLoaded', () => document.body.appendChild(gtDiv));
    }

    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    window.translatePage = function(lang) {
        if(lang === 'hinglish') lang = 'hi'; // Map hinglish to hindi for google translate
        
        var selectField = document.querySelector('select.goog-te-combo');
        if (selectField) {
            selectField.value = lang;
            selectField.dispatchEvent(new Event('change'));
        } else {
            document.cookie = 'googtrans=/en/' + lang + '; path=/';
            location.reload();
        }
    };
    
    // Sync dropdown on load
    window.addEventListener('DOMContentLoaded', () => {
        const selector = document.getElementById('languageSelector');
        if(selector) {
            const match = document.cookie.match(/googtrans=\/en\/([a-z-]+)/);
            if(match && match[1]) {
                selector.value = match[1] === 'hi' ? 'hi' : 'en';
            }
        }
    });
})();
