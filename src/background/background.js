function onContextMenuClick(info,tab) {
  var target = info.linkUrl;
  var contextUrl = tab.url;
  displaySelectTargetDialog(tab,target,contextUrl);
}

function displaySelectTargetDialog(tab,targetUrl, contextUrl, title) {
  // chrome.pageAction.show(tab.id);
  link_title=title;
  chrome.windows.create(
      {url: "src/sendto/sendto.html", type: "popup", top : 100, left : 200, width: 650, height: 430}
       ,function(window) {
          // change implicit callback
          sendLink = function(uid, comment, title) {doSendLink(uid,comment,targetUrl,  contextUrl, title)};
	  /*chrome.runtime.sendMessage({targetUrl: targetUrl, contextUrl: contextUrl}, function(response) {
	    console.log(response.farewell);
	  });*/
       });
}

// register context menu item
chrome.contextMenus.create({"title": "Send to Nuxeo", "contexts":['link'],
                                       "onclick": onContextMenuClick});

function doSendLink(uid,comment, targetUrl,  contextUrl, title) {
  if (!comment && contextUrl) {
    comment = "link taken from " + contextUrl;
  }

  // doc type mapping
  var prop = "dc:title=" + title + "\n";

  var docType = getSettings("docType");

  if (docType=="Note") {
    prop += "note:mime_type=text/html\n";
    prop += "note:note=<A href='"+targetUrl+"'>"+ targetUrl + "</A>\n";
  } else if (docType=="link") {
    prop += "link:url=" + targetUrl + "\n";
  }
  
  prop += "dc:description=" + comment + "\n"

  var nxConfig =  getAutomationSettings();
  nuxeo.op("Document.Create",nxConfig).params({
    type: docType,
    properties: prop
  })
  .input("doc:" + uid)
  .fail(function(){alert("failed!")})
//  .done(alert("created ok"))
  .execute();
}

var sendLink = function(uid) {alert("default")};
var link_title=null;

function getLinkTitle(){
  return link_title;
}

initConfig();
