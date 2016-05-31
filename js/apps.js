OS.apps = [
    {
        title: "Browser",
        app: "browser",
        theme: "light",
        taskbar: true,
        height: 400,
        width: 700
    },
    {
        title: "Search",
        app: "google",
        theme: "light",
        height: 400,
        width: 700
    },
    {
        title: "Settings",
        app: "settings",
        type: "inline",
        theme: "light",
        height: 400,
        width: 700
    },
    {
        title: "Window",
        app: "window",
        type: "inline",
        theme: "light",
        taskbar: true,
        height: 400,
        width: 700
    },
    {
        title: "Window2",
        app: "window2",
        type: "inline",
        theme: "light",
        height: 400,
        width: 700
    }
];

$(document).ready(function() {
    _.forEach(_.sortBy(OS.apps, 'title'), function(object) {
        var $path = "./apps/";
        var $taskbar = $(".toolbar .apps");
        var $launcher = $(".launcher .applications");
        var $app_id = "app_" + object.app;
        var $img_path = $path + object.app + "/app.png";
        var $main_path = $path + object.app + "/index.html";

        var $app =  $('<div class="app" id="' + $app_id + '"></div>');
        var $icon =     $('<div class="app-icon"></div>');
        var $img =          $('<img src="' + $img_path + '" height="48px">');
        var $title =    $('<div class="app-title"></div>').text(object.title);

        $.preload_img($img_path);

        $icon.append($img);
        $app.append($icon);
        $app.append($title);
        $launcher.append($app);

        if (object.taskbar) $taskbar.append('<span id="' + $app_id + '"><img src="' + $img_path + '" height="32px"></span>');

        $("[id^='" + $app_id + "']").click(function(e) {
            e.stopImmediatePropagation();
            new OS().Window(object);
            $(".launcher").fadeOut(25);
            $("#app_launcher").removeClass("active");
            popovers.apps = false;
        });
    });
});
