chrome.action.onClicked.addListener(function (tab) {

    chrome.scripting.executeScript({
        
        target: { tabId: tab.id },

        function: () => {

            let cssInjected = false;

            const readingModeCSS = `
                img, video, svg,iframe{
                    visibility: hidden !important;
                }
                
                [style*="background-image: "],[style*="background: "]{
                    background-image: none !important;
                    background:#000 !important;
                }
            `;

            const existingStyle = document.querySelector('style[data-extension="Reading_Mode"]');

            if (existingStyle) {
                existingStyle.remove();
                cssInjected = false;
            } else {
                const style = document.createElement('style');
                style.textContent = readingModeCSS;
                style.setAttribute('data-extension', 'Reading_Mode');
                document.head.append(style);
                cssInjected = true;
            }

        },

    });

});