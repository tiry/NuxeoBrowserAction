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
    comment = "link from " + contextUrl;
  }

  var nxConfig =  getAutomationSettings();
  nuxeo.op("Document.Create",nxConfig).params({
    type: getSettings("docType"),
    properties: "dc:title=link\nnote:mime_type=text/html\nnote:note=<A href='"+targetUrl+"'>"+ targetUrl + "</A>\ndc:description=" + comment
  })
  .input("doc:" + uid)
  .fail(function(){alert("failed!")})
  .done(alert("ok"))
  .execute();
}

var sendLink = function(uid) {alert("default")};
var link_title=null;

function getLinkTitle(){
  return link_title;
}

initConfig();
