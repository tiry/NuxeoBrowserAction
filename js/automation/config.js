
function getSettings(name) {
  return JSON.parse(localStorage.getItem("store.settings." + name));
}

function getAutomationSettings() {

  var nxConfig =  {};
  
  nxConfig.url = getSettings("serverUrl");
  if (nxConfig.url.indexOf("/", nxConfig.url.length - 1) == -1) {
    nxConfig.url +="/";
  }
  nxConfig.url +="site/automation";

  nxConfig.username = getSettings("username");
  nxConfig.password = getSettings("password");

  return nxConfig;
}

function initConfig() {

   var default_config = {"username":"Administrator",
                         "password":"Administrator",
                         "serverUrl" : "http://axapoc.cloud.nuxeo.com/nuxeo/",
                         "nxql" : "select * from SocialWorkspace",
                         "docType":"link"};

   for (var key in default_config) {
      var val = getSettings(key);
      if (val==null || val==="") {
         localStorage.setItem("store.settings." + key, JSON.stringify(default_config[key]));
      }
   }
}

