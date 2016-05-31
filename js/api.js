var windows = {};
var notifications = {};

var activeWindows = [];

window.OS = function() {
    var $overlay = $(".overlay");
    var $windows = $(".windows");
    var $alerts = $(".alerts");
    var $notifications = $(".breadbox");
    var $app_path = "./apps/";
    var $this = this;

    this.Window = function(object) {
        var $id = guid();
        var $data;
        var $url = $app_path + object.app + "/index.html";

        // Window Template
        var $window =   $('<div class="window" id="' + $id + '"></div>').hide();
        var $menubar =      $('<div class="menubar"></div>');
        var $title =            $('<div class="title"></div>');
        var $controls =         $('<div class="controls"></div>');
        var $ui_min =               $('<span id="minimize"><i class="material-icons">remove</i></span>');
        var $ui_max =               $('<span id="maximize"><i class="material-icons">add</i></span>');
        var $ui_close =             $('<span class="close"><i class="material-icons">close</i></span>');
        var $content =      $('<div class="content"></div>');
        var $page =             $('<div class="page"></div>');
        var $frame =                $('<iframe src="' + $url + '" width="100%" height="100%" frameBorder="0"></iframe>');

        $.ajax({ url: $url })
            .done(function(data) {
                $data = data;

                if (object.type === "inline") {
                    $page.append(data);
                    $window.addClass("inline");
                } else {
                    $page.append($frame);
                    $window.addClass("frame");
                }

                $window.show();
            }).fail(function(error) {
                $window.remove();
                $this.Alert({
                    title: "System Error",
                    message: "Failed to open " + object.app + ".app, Check the JavaScript console for more details."
                });
            });

        // Build Window
        $window.addClass(object.theme || "light");
        $title.text(object.title);
        $content.css({
            "height": object.height + "px" || 400,
            "width": object.width + "px" || 700
        });

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
        $window.draggable({
            handle: $menubar,
            scroll: false,
            containment: "parent",
            start: function() {
                _.pull(activeWindows, $id);
                activeWindows.push($id);
                updateZIndexes(activeWindows);
            }
        });

        $window.resizable({
            minHeight: 400,
            minWidth: 700,
            containment: "parent",
            handles: "all",
            alsoResize: $content
        });

        $window.position({
            of: $windows,
            my: "center center",
            at: "center center"
        });

        $window.focus();

        // Window Activation
        if (!windows[object.app]) windows[object.app] = {};
        //if (!$("#" + object.app).hasClass("active")) $("#" + object.app).addClass("active");
        windows[object.app][$id] = true;

        $(".window#" + $id).click(function(e) {
            _.pull(activeWindows, $id);
            activeWindows.push($id);
            updateZIndexes(activeWindows);
        });

        // Window Close
        $(".window#" + $id + " .controls .close").click(function(e) {
            // Prevent Double Trigger
            e.stopImmediatePropagation();

            // Destroy Window
            fadeRemove($window, 85);
            windows[object.app][$id] = false;

            // Remove from list of active windows
            _.pull(activeWindows, $id);

            // Remove Window Indicator if All Windows Closed
            /*if (_.every(_.values(windows[object.app]), function(v) {return !v;})) $("#" + object.app).removeClass("active");*/
        });
    };

    this.Notification = function(object) {
        var $id = guid();
        var $type = (object.type) ? object.type : 0;

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

        // Set Timeout
        notifications[$id] = setTimeout(function() {
            fadeRemove($notification);
        }, 8000);

        // Notification Hover
        $(".notification#" + $id).hover(function(e) {
            // Get Notification ID
            var $notif_id = $(this).closest(".notification").attr("id");
            var $notif = $(".notification#" + $notif_id);

            if (e.type == "mouseenter") {
                clearTimeout(notifications[$notif_id]);
            } else if (e.type == "mouseleave") {
                delete notifications[$notif_id];
                fadeRemove($notif);
            }
        });

        // Notification Click
        $(".notification#" + $id).click(function(e) {
            // Prevent Double Trigger
            e.stopImmediatePropagation();

            // Get Notification ID
            var $notif_id = $(this).closest(".notification").attr("id");
            var $notif = $(".notification#" + $notif_id);

            // Stop Timeout Timer
            clearTimeout(notifications[$notif_id]);

            // Destroy Notification
            delete notifications[$notif_id];
            fadeRemove($notif);
        });
    };

    this.Alert = function(object) {
        var $id = guid();
        var $theme = object.theme || "light";

        // Alert Template
        var $alert =        $('<div class="alert ' + $theme + '" id="' + $id + '"></div>');
        var $title =            $('<div class="title"></div>');
        var $message =          $('<div class="message"></div>');
        var $action =           $('<div class="action"></div>');
        var $action_btn =           $('<button class="' + $theme + '">OK</button>');

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

        $(".alert#" + $id + " .action button").click(function(e) {
            // Prevent Double Trigger
            e.stopImmediatePropagation();

            // Destroy Alert
            $overlay.fadeOut("fast");
            fadeRemove($alert);
        });
    };
};

function guid() {
    function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function fadeRemove(el, sp) {
    el.fadeOut(sp || "fast", function() {
        el.remove();
    });
}


function updateZIndexes(ids) {
    var baseIndex = 100; // the z-index to start with
    for (var i = 0; i < ids.length; ++i) {
        var id = ids[i];
        $('#' + id).css('z-index', baseIndex + i);
    }
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
