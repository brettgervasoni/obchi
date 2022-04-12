// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    sendResponse();
});

// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(request.message);
//   if (request.message === "show_results") {
//     console.log("fired");
//   }
// });

// console.log('dfssafs');

chrome.runtime.onMessage.addListener((msg, sender) => {
  // First, validate the message's structure.
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab.
    chrome.pageAction.show(sender.tab.id);
  }
});

// for icon updating, unique to each tab
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "updateIcon") {
      if (msg.results) {
        const updateIcon = tabId => {
          const icon = "icons/icon128-green.png";
          chrome.pageAction.setIcon({ tabId, path: icon });
        };
        chrome.tabs.onUpdated.addListener(updateIcon);
      } else {
        const updateIcon = tabId => {
          const icon = "icons/icon128.png";
          chrome.pageAction.setIcon({ tabId, path: icon });
        };
        chrome.tabs.onUpdated.addListener(updateIcon);
    }
  }
});
