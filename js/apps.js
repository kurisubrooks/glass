var apps = [
    {
        title: "Browser",
        app: "app_browser",
        icon: "./icons/small/Chrome.png",
        theme: "light",
        height: 480,
        width: 800,
        main: "browser.html"
    },
    {
        title: "Settings",
        app: "app_settings",
        icon: "./icons/small/Settings.png",
        theme: "light",
        height: 420,
        width: 700,
        main: "settings.html"
    },
    {
        title: "Terminal",
        app: "app_terminal",
        icon: "./icons/small/Terminal.png",
        theme: "dark",
        height: 400,
        width: 700,
        main: "terminal.html"
    }
];

$(document).ready(function() {    
    _.forEach(_.sortBy(apps, function(o) { return o.title; }), function(config) {
        $(document).delegate("[id^='" + config.app + "']", "click", function(e) {
            e.stopImmediatePropagation();
            new OS().Window(config);
        });
        
        $(".apps-popover").append('<div class="app" id="' + config.app + '">' +
        '<div class="app-icon"><img src="' + config.icon + '" height="48px"></div>' + 
        '<div class="app-title">' + config.title + '</div>' +
        '</div>');
    });
});
