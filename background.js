let result = ''
let collection = null

// background (event) page
let parent = chrome.contextMenus.create({
  "title": "console.log this element",
  "id": "ekjfhvqeriuy87rvh",
  "contexts": ["all"]
})

//no idea what this does but nothing works without it
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  chrome.tabs.sendMessage(tab.id, {})
})

//save classList
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "selection") {
      result = request.classList
      collection = request.collection
    }
})

//send classList to popup.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "imReady") {
      chrome.runtime.sendMessage({greeting: "result", result: result, collection: collection})
    }
})
