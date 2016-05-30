var windows = {};

var OS = function() {
    var $overlay = $(".overlay");
    var $windows = $(".windows");
    var $alerts = $(".alerts");
    var $notifications = $(".breadbox");
    var $app_path = "./apps/";
    var $this = this;

    this.Window = function(object) {
        var $id = guid();
        var $url = $app_path + object.app + "/index.html";

        // Window Template
        var $window =   $('<div class="window" id="' + $id + '"></div>');
        var $menubar =      $('<div class="menubar"></div>');
        var $title =            $('<div class="title"></div>');
        var $controls =         $('<div class="controls"></div>');
        var $ui_min =               $('<span id="minimize"><i class="material-icons">remove</i></span>');
        var $ui_max =               $('<span id="maximize"><i class="material-icons">add</i></span>');
        var $ui_close =             $('<span id="close"><i class="material-icons">close</i></span>');
        var $content =      $('<div class="content"></div>');
        var $page =             $('<div class="page"></div>');

        /*$.ajax({ url: $url })
            .done(function(data) {
                build(data);
            })
            .fail(function() {
                $this.Alert({
                    title: "Error",
                    message: "Failed to open " + object.title + ".app, refer to the JavaScript console for information"
                });
            });*/


        // Build Window
        $window.addClass((object.theme) ? object.theme : "light");
        $title.text(object.title);
        $content.height(object.height);
        $content.width(object.width);
        $page.html('<iframe src="' + $url + '" width="100%" height="100%" frameBorder="0"></iframe>');

        //$controls.append($ui_min);
        //$controls.append($ui_max);
        $controls.append($ui_close);
        $menubar.append($title);
        $menubar.append($controls);
        $content.append($page);
        $window.append($menubar);
        $window.append($content);
        $windows.append($window);

        // Window Positioning
        $("#" + $id).draggable({ handle: $("#" + $id + " .menubar"), scroll: false, containment: "parent" });
        $("#" + $id).resizable();
        $("#" + $id).position({ of: $windows, my: "center center", at: "center center" });

        // Window Activation
        if (!windows[object.app]) windows[object.app] = {};
        if (!$("#" + object.app).hasClass("active")) $("#" + object.app).addClass("active");
        windows[object.app][$id] = true;

        // Window Close
        $(document).delegate(".window#" + $id + " .controls #close", "click", function(e) {
            // Prevent Double Trigger
            e.stopImmediatePropagation();

            // Get Window ID
            var $window_id = $(this).closest(".window").attr("id");

            // Destroy Window
            $("#" + $window_id).remove();
            windows[object.app][$window_id] = false;

            // Remove Window Indicator if All Windows Closed
            if (_.every(_.values(windows[object.app]), function(v) {return !v;})) $("#" + object.app).removeClass("active");
        });
    };

    this.Notification = function(object) {
        var $id = guid();

        // Notification Template
        var $notification =     $('<div class="notification" id="' + $id + '"></div>');
        var $image_container =      $('<div class="image"></div>');
        var $image =                    $('<img width="35px">');
        var $text_container =       $('<div class="text"></div>');
        var $title =                    $('<div class="title"></div>');
        var $subtitle =                 $('<div class="subtitle"></div>');
        var $message =                  $('<div class="message"></div>');

        // Build Notification
        $image.attr("src", object.icon);
        $title.text(object.title);
        $subtitle.text((object.subtitle) ? object.subtitle : "");
        $message.text(object.message);

        $text_container.append($title);
        $text_container.append($subtitle);
        $text_container.append($message);
        $image_container.append($image);
        $notification.append($image_container);
        $notification.append($text_container);
        $notifications.append($notification);

        setTimeout(function() {
            $notification.fadeOut("fast", function() {
                $notification.remove();
            });
        }, 8000);
    };

    this.Alert = function(object) {
        var $id = guid();

        // Alert Template
        var $alert =        $('<div class="alert dark" id="' + $id + '"></div>');
        var $title =            $('<div class="title"></div>');
        var $message =          $('<div class="message"></div>');
        var $action =           $('<div class="action"></div>');
        var $action_btn =           $('<button class="dark">OK</button>');

        // Build Alert
        $title.text(object.title);
        $message.html(object.message);

        $action.append($action_btn);
        $alert.append($title);
        $alert.append($message);
        $alert.append($action);
        $alerts.append($alert);
        $overlay.fadeIn("fast");
        $alert.fadeIn("fast");

        $(document).delegate(".alert#" + $id + " .action button", "click", function(e) {
            // Prevent Double Trigger
            e.stopImmediatePropagation();

            // Get Alert ID
            var $alert_id = $(this).closest(".alert").attr("id");

            // Destroy Alert
            $overlay.fadeOut("fast");
            $("#" + $alert_id).fadeOut("fast", function() {
                $("#" + $alert_id).remove();
            });
        });
    };
};

function guid() {
    function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function safe(string) {
    console.log(string);

    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
    });
}
