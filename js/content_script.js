// Object to hold information about the current page
var pageInfo = {
    /*"username": document.title,
    "firstname": window.location.href,
    "lastname": window.getSelection().toString()*/
};

// Send the information back to the extension
chrome.extension.sendRequest(pageInfo);