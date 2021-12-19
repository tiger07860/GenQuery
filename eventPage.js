var menuItem = {
    id: "query:wikipedia",
    title: "Search on Wikipedia",
    contexts: ["selection"],
};

var menuItem1 = {
    id: "query:youtube",
    title: "Search on Youtube",
    contexts: ["selection"],
};

var menuItem2 = {
    id: "textToSpeech",
    title: "Convert text to speech",
    contexts: ["selection"],
};

chrome.contextMenus.create(menuItem, () => chrome.runtime.lastError);
chrome.contextMenus.create(menuItem1, () => chrome.runtime.lastError);
chrome.contextMenus.create(menuItem2, () => chrome.runtime.lastError);

function fixedEncodeURIWikipedia(str) {
    return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "query:wikipedia" && clickData.selectionText) {
        var wikiUrl =
            "https://en.wikipedia.org/wiki/" +
            fixedEncodeURIWikipedia(clickData.selectionText);
        var createData = {
            url: wikiUrl,
            type: "popup",
            top: 5,
            left: 5,
            width: screen.availWidth / 2,
            height: screen.availHeight / 2,
        };
        chrome.windows.create(createData, function () {});
    }

    if (clickData.menuItemId == "textToSpeech" && clickData.selectionText) {
        chrome.tts.speak(clickData.selectionText, { rate: 1 });
    }

    if (clickData.menuItemId == "query:youtube" && clickData.selectionText) {
        var wikiUrl =
            "https://www.youtube.com/results?search_query=" +
            fixedEncodeURIWikipedia(clickData.selectionText);
        var createData = {
            url: wikiUrl,
            type: "popup",
            top: 5,
            left: 5,
            width: screen.availWidth / 2,
            height: screen.availHeight / 2,
        };
        chrome.windows.create(createData, function () {});
    }
});
