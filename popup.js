let hideButton = document.getElementById("hideButton");

hideButton.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript({
      file: "/remove-script.js",
      allFrames: true,
    });
  });
};
