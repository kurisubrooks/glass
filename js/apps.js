$(document).ready(function() {
    var API = new OS();
    
    var apps = [
        {
            title: "Browser",
            app: "app_browser",
            icon: "./icons/large/Browser.png",
            theme: "light",
            height: 480,
            width: 800,
            content: '<div style="text-align:center;padding-top:7.5em;"><img src="https://www.google.com.au/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"><br><br><input type="text" style="border:1px solid #EEE;width:500px;height:38px;font:inherit;padding:2px 1em;" align="center"><br><br><button style="-webkit-border-radius: 2px;-webkit-user-select: none;background-color: #f2f2f2;border: 1px solid #f2f2f2;border-radius: 2px;color: #757575;cursor: default;font-family: arial,sans-serif;font-size: 13px;font-weight: bold;margin: 11px 4px;min-width: 54px;padding: 0 16px;text-align: center;height: 36px;line-height: 27px;">Google Search</button><button style="-webkit-border-radius: 2px;-webkit-user-select: none;background-color: #f2f2f2;border: 1px solid #f2f2f2;border-radius: 2px;color: #757575;cursor: default;font-family: arial,sans-serif;font-size: 13px;font-weight: bold;margin: 11px 4px;min-width: 54px;padding: 0 16px;text-align: center;height: 36px;line-height: 27px;">I\'m Feeling Lucky</button></div>'
        },
        {
            title: "Settings",
            app: "app_settings",
            icon: "./icons/large/Terminal.png",
            theme: "dark",
            height: 400,
            width: 600,
            content: "<p>Setting stuff. Change values hurr durr</p>"
        },
        {
            title: "Terminal",
            app: "app_terminal",
            icon: "./icons/large/Terminal.png",
            theme: "dark",
            height: 400,
            width: 700,
            content: "Hello!"
        },
        {
            title: "Window",
            app: "app_test",
            icon: "./icons/large/Browser.png",
            theme: "light",
            height: 400,
            width: 700,
            content: "Test"
        }
    ];
    
    _.forEach(_.sortBy(apps, function(o) { return o.title; }), function(config) {
        $("[id^='" + config.app + "']").click(function() {
            API.Window(config);
        });
        
        $(".apps-popover").append('<div class="app" id="' + config.app + '">' +
        '<div class="app-icon"><img src="' + config.icon + '" height="48px"></div>' + 
        '<div class="app-title">' + config.title + '</div>' +
        '</div>');
    });
    
    // Notification
    API.Notification({
        title: "Shake",
        urgent: true,
        icon: "",
        sound: "",
        message: "宮城県沖 マグニチュード６.３ 震度７"
    });
    
    // Toast
    API.Toast({
        message: "Unknown Error"
    });
    
    // Alert
    API.Alert({
        title: "地震警報",
        message: "緊急地震速報<br>千葉沖で地震発生。強い揺れに備えて下さい（気象庁）"
    });

    // System Clock
    function clock() { $("#meta_time").text(moment().format("h:mm A")); }
    setInterval(clock, 1000);
    clock();
});
