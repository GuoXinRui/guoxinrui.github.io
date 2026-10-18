(function () {
  var WEBSITE_ID = "bbf54762-5e29-4175-8dcd-f8937b30b293";
  var SRC = "https://cloud.umami.is/script.js";

  if (WEBSITE_ID) {
    var tag = document.createElement("script");
    tag.defer = true;
    tag.src = SRC;
    tag.setAttribute("data-website-id", WEBSITE_ID);
    document.head.appendChild(tag);
  }

  function describe(href) {
    var app = "unknown";
    if (href.indexOf("inkflow") > -1) app = "InkFlow";
    else if (href.indexOf("timerestorer") > -1) app = "Time Restorer";
    var store = href.indexOf("apps.apple.com") > -1 ? "App Store" : "Google Play";
    return { app: app, store: store };
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest(".store-link") : null;
    if (!link || !link.href) return;

    var info = describe(link.href);
    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track("Download click", info);
    }
  });
})();
