_OKCP.reviewProfiles = function() {
  var storage = JSON.parse(localStorage.okcp);
  var profiles = storage.profileList;

  // although accessing objects is slower, I'm choosing to use this method because it makes the code so pretty!
  var profilesCategorized = {
    poly: {}, //is poly
    non_poly: {}, //is not poly
    to_message: {}, //want to message
    maybe: {}, //maybe
    uninterested: {}, //not for me
    no_info: {} //no answers
  };
  var profileShortcuts = {
    poly: "Poly",
    to_message: "To Message",
    maybe: "Maybe",
    non_poly: "Not Poly",
    uninterested: "Not For Me",
    no_info: "No Answers"
  };

  for (var profile in profiles) {
    var profileObj = profiles[profile];
    for (var key in profileObj) {
      if (
        key === "poly" ||
        key === "non_poly" ||
        key === "to_message" ||
        key === "maybe" ||
        key === "uninterested" ||
        key === "no_info"
      )
        if (profileObj[key])
          //if key is set to true
          profilesCategorized[key][profile] = profileObj; //add profile to the appropriate object
    }
  }
  console.log(profilesCategorized);
  showProfileReviewer();

  function showProfileReviewer() {
    $("body").append(
      '<div class="rp-outer-wrapper"><div class="rp-wrapper"><ul class="rp-list"></ul></div></div>'
    );
    $('<a class="iframe-close-btn">X</a>')
      .prependTo(".rp-wrapper")
      .click(hideProfileReviewer);
    var bigList = $(".rp-list");
    for (var key in profilesCategorized) {
      if (key === "non_poly" || key === "uninterested" || key === "no_info")
        continue; //probably nobody cares about non-poly, not for me, or no answers profiles
      var readableKey = profileShortcuts[key];
      var item = $(
        '<li class="rp-list-item"><h2>' + readableKey + "</h2></li>"
      );
      var sublist = $('<ul class="category-list"></ul>');
      item.append(sublist);
      bigList.append(item);
      var sublistData = profilesCategorized[key];
      for (var profile in sublistData) {
        var profileObj = sublistData[profile];
        var profileElem = $('<li class="profile"></li>');
        var locationStr = profileObj.location
          ? " (" + profileObj.location + ")"
          : "";
        profileElem.append(
          '<a href="//www.okcupid.com/profile/' +
            profile +
            '" target="_blank">' +
            profile +
            '</a><span class="location">' +
            locationStr +
            "</span>"
        );
        sublist.append(profileElem);
      }
    }
  }
  function hideProfileReviewer() {
    $(".rp-outer-wrapper").remove();
  }
};
