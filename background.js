/*
 * Window popup using page action
 *
 * @ref: https://developer.chrome.com/extensions/pageAction
 * @ref: https://developer.chrome.com/extensions/examples/api/pageAction/set_icon.zip
 * This is a workaround to make sure chrome.pageAction.onClicked works.
 *
 * The idea here to to force popup to show on GitHub and GitLab pages,
 * but as we don't assign popup, it fails and called onClicked.
 * If we don't do this, onClicked won't be triggered.
 */

const forcePopup = ({ id, url }) => {
  chrome.pageAction.show(id);
};

chrome.tabs.onUpdated.addListener((tabId, activeInfo, tab) => {
  forcePopup(tab);
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, forcePopup);
});

chrome.pageAction.onClicked.addListener(({ url }) => {
  chrome.tabs.executeScript({
    file: "/remove-script.js",
    allFrames: true,
  });
});

// chrome.runtime.onInstalled.addListener(function () {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: "" },
//           }),
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()],
//       },
//     ]);
//   });
// });
