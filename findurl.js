function getThumbnailURL(linkUrl)
{
    var sstr = '<link itemprop="thumbnailUrl" href=';
    var rstr = "";

    if (linkUrl.includes("youtube") && linkUrl.includes("watch?v="))
    {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function()
        {
            if(req.readyState == 4 && req.status == 200)
            {
                console.log("Successfully loaded video page");
                rstr = req.responseText;
      
                if(rstr.search(sstr) != -1)
                {
                    console.log("Thumbnail URL found");
                    rstr = rstr.split(sstr)[1];
                    rstr = rstr.split('"')[1];
                }
            }
            else
            {
                console.log("ReadyState: "  + String(req.readyState));
                console.log("Status: "  + req.statusText);
            }
        }
        req.open("GET", linkUrl, false); 
        req.send();
    }
    
    return rstr;
}

function handleMessage(request, sender, sendResponse) 
{
    console.log("Received link to video: " + request.message);
    thumbnailUrl = getThumbnailURL(request.message);
    sendResponse({response : thumbnailUrl});
}

browser.runtime.onMessage.addListener(handleMessage);