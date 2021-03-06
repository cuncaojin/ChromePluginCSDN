console.log("cuncaojin: js/background.js");

// async function getCurrentTab() {
//   /* ... */
// }
// let tab = await getCurrentTab();
// chrome.scripting.executeScript({
//   target: { tabId: tab.id },
//   files: ['jquery-min.js, content-script.js']
// });

chrome.action.onClicked.addListener((tab) => {
  console.log("cuncaojin: action.onClick");
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"],
  });
});

// function injectedFunction() {
//   document.body.style.backgroundColor = 'orange';
// }
// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: injectedFunction
//   });
// });

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     "id": "sampleContextMenu",
//     "title": "Sample Context Menu",
//     "contexts": ["selection"],
//   });
// });

// // This will run when a bookmark is created.
// chrome.bookmarks.onCreated.addListener(() => {
//   // do something
//   alert("bookmarks.onCreated");
// });

// chrome.runtime.onMessage.addListener((message, callback) => {
//   const tabId = getForegroundTabId();
//   if (message.data === "setAlarm") {
//     chrome.alarms.create({delayInMinutes: 5})
//   } else if (message.data === "runLogic") {
//     chrome.scripting.executeScript({file: 'logic.js', tabId});
//   } else if (message.data === "changeColor") {
//     chrome.scripting.executeScript(
//         {func: () => document.body.style.backgroundColor="orange", tabId});
//   };
// });

chrome.runtime.onMessage.addListener((message, callback) => {
  if (message === "hello") {
    sendResponse({ greeting: "welcome!" });
  } else if (message === "goodbye") {
    chrome.runtime.Port.disconnect();
  }
});
