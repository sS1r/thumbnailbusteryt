//Create the context menu item
browser.contextMenus.create(
{
    id: "viewthumbnail",
    title: "View thumbnail",
    contexts: ["link"],
    documentUrlPatterns: ["*://*.youtube.com/*"], //To prevent Cross-Origin Resource Sharing problems
    targetUrlPatterns: ["*://*.youtube.com/watch?v=*"]
});


function handleResponse(message) 
{
    console.log("Received thumbnail URL: " + message.response);
    if(message.response != "")
    {
        browser.tabs.create({url : message.response});
    }
}

function handleError(error) 
{
    console.log("Error: " + error);
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
    var linkUrl = info.linkUrl;
    if (info.menuItemId == "viewthumbnail") 
    {
        if (linkUrl.includes("youtube") && linkUrl.includes("watch?v="))
        {
            console.log("Link to a Youtube video");
            var sending = browser.tabs.sendMessage(tab.id, { message : linkUrl });
            sending.then(handleResponse, handleError);
        }
    } 
});