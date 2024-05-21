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

// TODO: 监听标签页创建事件，如果是新标签页，则打开指定页面(have bug now)
// var tabId = null;
// chrome.tabs.onCreated.addListener(function (tab) {
//   // 利用一个标志变量来区分第一次运行的情况，通常新标签页创建后首次运行的逻辑可以认为是直接创建的新标签页
//   if (tabId === null && ((tab.url === 'chrome://newtab/' || tab.url === '' || tab.url.startsWith('chrome://new-tab-page-third-party') ||
//     tab.url.startsWith('https://www.bing.com/chrome/newtab')))) {
//     // chrome.tabs.update(tab.id, { url: 'https://metaso.cn/' })
//     // chrome.tabs.update(tab.id, { url: 'https://www.baidu.com' });
//     // chrome.tabs.update(tab.id, { url: '/html/onboarding.html' });
//     tabId = tab.id;
//   }
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
