//Create the context menu item
browser.contextMenus.create(
{
    id: "viewthumbnail",
    title: "View thumbnail",
    contexts: ["link"],
    documentUrlPatterns: ["*://*.youtube.com/*"], //To prevent Cross-Origin Resource Sharing problems
    targetUrlPatterns: ["*://*.youtube.com/watch?v=*"]
});

//Get the thumbnail URL as a response and open a new tab
function handleResponse(message) 
{
    console.log("Received thumbnail URL: " + message.response);
    if(message.response != "")
    {
        browser.tabs.create({url : message.response});
    }
}

//Handle errors
function handleError(error) 
{
    console.log("Error: " + error);
}

//Listen to context menu activations
browser.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "viewthumbnail") 
    {
        var linkUrl = info.linkUrl;
        console.log("'View thumbnail' clicked at a Youtube video");
        var sending = browser.tabs.sendMessage(tab.id, { message : linkUrl });
        sending.then(handleResponse, handleError);
    } 
});