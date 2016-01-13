var self = require('sdk/self');
var { getTabForId, setTabURL } = require ("sdk/tabs/utils");
var tabID = "calvin-bot-tab";
var tabs = require("sdk/tabs");
var { setInterval } = require("sdk/timers");
var buttons = require('sdk/ui/button/action');
var panels = require("sdk/panel");
var delay = 1000 * 60 * 10
var isShowing = false;



function reloadURLFromBackend() {
    var Request = require("sdk/request").Request;
    var randomURL = Request({
      url: "http://calvin-backend.herokuapp.com/data/get_random_url.json",
      onComplete: function (response) {
        var newURL = response.json.url;
        console.log("success with URL:- " + newURL);
        openRandomURL(newURL);
      }
    }).get();
}

function openRandomURL(url) {
  setTabURL(getTabForId(tabID), url)
}

function startCavin() {
  tabs.open({
    url: "http://www.moldedbits.com",
    onReady: function onReady(tab) {
    },
    isPinned: false,
    onActivate: function onActivate(tab) {
      reloadURLFromBackend()
      tabID = tab.id;
    }
  });

  setInterval(function() {
    reloadURLFromBackend()
  }, delay);
}
var button = buttons.ActionButton({
  id: "cavin-addon",
  label: "Load Cavin add-on",
  icon: {
    "16": "resource://@calvin-addon/globe-16.png",
    "32": "resource://@calvin-addon/globe-32.png",
    "64": "resource://@calvin-addon/globe-48.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  if(isShowing == false || getTabForId(tabID) == null) {
    startCavin();
    isShowing = true;
  }
  else {
    reloadURLFromBackend();
  }
}
