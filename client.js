var storage = {
    windows: {}
};

$(document).ready(function() {
    // Disable Right Click
    $(document).on("contextmenu", function() {
        return false;
    });

    // Spawn new Window
    function window(object, callback) {
        //if (storage.windows[object.app]) return;

        $id = guid();
        $desktop = $('.windows');
        $window = $('<div class="window" id="' + $id + '"></div>');
        $menubar = $('<div class="menubar"></div>').css("background", (object.color) ? object.color : "#EEE");
        $title = $('<div class="title"></div>').text(object.title);
        $controls = $('<div class="controls"></div>');
        $ui_min = $('<span id="minimize"><i class="material-icons">remove</i></span>');
        $ui_max = $('<span id="maximize"><i class="material-icons">add</i></span>');
        $ui_close = $('<span id="close"><i class="material-icons">close</i></span>');
        $content = $('<div class="content"></div>').html(object.html);

        $controls.append($ui_min);
        $controls.append($ui_max);
        $controls.append($ui_close);
        $menubar.append($title);
        $menubar.append($controls);
        $window.append($menubar);
        $window.append($content);
        $desktop.append($window);

        $("#" + $id).draggable({ handle: $("#" + $id + " .menubar") });
        $("#" + $id).position({
            of: $(".desktop"),
            my: "center center",
            at: "center center"
        });

        //storage.windows[object.app] = true;

        /*$("#" + $id + " #close").bind("click", function() {
            storage.windows[object.app] = false;
            $("#" + $id).remove();
            $("#" + object.app).removeClass("active");
        });*/

        $(document).delegate(".window .controls #close", "click", function() {
            //storage.windows[object.app] = false;
            var winID = $(this).closest("div.window").attr("id");
            $("#" + winID).remove();
            $("#" + object.app).removeClass("active");
        });

        $("#" + object.app).addClass("active");
    }

    // Create Unique ID
    function guid() {
        var S4 = function() {
           return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() +S4());
    }

    // Browser Application
    $("#app_browser").click(function() {
        window({
            title: "Window",
            app: "app_browser",
            html: ""
        });
    });

    // Settings Application
    $("#app_settings").click(function() {
        window({
            title: "Settings",
            app: "app_settings",
            html: "Setting stuff. Change values hurr durr"
        });
    });

    // System Clock
    function clock() { $("#meta_time").text(moment().format("h:mm A")); }
    setInterval(clock, 1000);
    clock();
});
