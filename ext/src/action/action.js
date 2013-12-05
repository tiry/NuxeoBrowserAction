window.onload = function () {
  jQuery("#send").click(function(event) {
  	//chrome.browserAction.setBadgeText({text : "yo"});
  	chrome.tabs.query({"active":true},function (tab) {
  		var url = tab[0].url;
  		var title = tab[0].title;
        chrome.runtime.getBackgroundPage(
		  function(bgWindow) {
			bgWindow.displaySelectTargetDialog(tab[0], url, url, title);
	        // close the popup !
    	    chrome.tabs.update({ active: true });			 
		    });  
  	})
  });

};

