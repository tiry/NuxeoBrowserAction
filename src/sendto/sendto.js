
var targetUrl;
var targetContainer;

function isSubLinkMode() {
  var curl = document.location.href;
  return curl.indexOf("#sublink")>0;
}

function fetchData() {
  // bind click
  jQuery("#send").click(function(){
     if (!targetContainer) {
       alert("Select target container");
       return;
     }
     var comment = jQuery("#comment").val();
     var title = jQuery("#title").val();
     sendToNuxeo(targetContainer,comment, title); 
   });

  var nxConfig =  getAutomationSettings();
  nuxeo.op("Document.PageProvider",nxConfig).params({
    query: getSettings("nxql"),
    pageSize: 50,
    page: 0
  })
  .fail(function(){alert("failed!")}).done(displayPosssibleTargets)
  .execute();

  if (isSubLinkMode()) {
    targetUrl=null;
    targetTitle=null;
    // fetch title from background page where the link was clicked 
    chrome.runtime.getBackgroundPage(
      function(bgWindow) {
        jQuery("#title").val(bgWindow.getLinkTitle());            
    });            
  } else {
    // get current page           
    chrome.tabs.query({"active":true},function (tab) {
      targetUrl=tab[0].url;
      jQuery("#title").val(tab[0].title);   
    })

  }
}

function buildClickCallBack(uid) {
  return function(e){
	jQuery(".container").removeClass("selectedContainer");        
        targetContainer=uid;
        jQuery(e.target).addClass("selectedContainer");
  };
}

function displayPosssibleTargets(docs) {
   var container=jQuery("#containers");
   for (var i=0; i < docs.currentPageSize; i++) {
     var item=jQuery("<div></div>");
     item.addClass("container");
     var cb = buildClickCallBack(docs.entries[i].uid); 
     item.click(cb);
     var img = jQuery("<img/>");
     img.attr("src", "/icons/folder.gif");
     item.append(img);
     var text = jQuery("<span><span>");
     text.html(docs.entries[i].properties["dc:title"]);
     item.append(text);
     item.attr("title", docs.entries[i].properties["dc:description"]);
     container.append(item);
   }
}

function sendToNuxeo(selectedTarget, comment, title) {
	chrome.runtime.getBackgroundPage(
		function(bgWindow) {
      if (targetUrl==null) {
         bgWindow.sendLink(selectedTarget,comment, title);
         window.close(); 
      } else {
			   bgWindow.doSendLink(selectedTarget,comment, targetUrl, null, title);
         targetUrl=null;
         // close the popup !
         chrome.tabs.update({ active: true });         
      }    	
	});  
}

document.addEventListener('DOMContentLoaded', fetchData);

