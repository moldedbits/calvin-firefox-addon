var self = require('sdk/self');
var { getTabForId, setTabURL } = require ("sdk/tabs/utils");
var tabID = "calvin-bot-tab";
var tabs = require("sdk/tabs");
var { setInterval } = require("sdk/timers");
var delay = 1000 * 60 * 10

tabs.open({
  url: "http://www.moldedbits.com",
  onReady: function onReady(tab) {
  },
  isPinned: true,
  onActivate: function onActivate(tab) {
    reloadURLFromBackend()
    tabID = tab.id;
  }
});

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

setInterval(function() {
  reloadURLFromBackend()
}, delay)
