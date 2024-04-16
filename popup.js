document.addEventListener("DOMContentLoaded", function () {
    var injectCSSButton = document.getElementById("injectCSS");
  
    injectCSSButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            function: () => {
              const css = `
                body {
                    filter: invert(1);
                }
                img,video,svg{
                    filter:invert(1);
                }
              `;
              const style = document.createElement('style');
              style.textContent = css;
              document.head.append(style);
            },
          },
          function (results) {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            } else {
              console.log('CSS injected successfully!');
            }
          }
        );
      });
    });
  });