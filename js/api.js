var windows = {};

var OS = function() {
    $overlay = $(".overlay");
    $windows = $(".windows");
    $alerts = $(".alerts");
    $notifications = $(".breadbox");
    
    this.Window = function(object) {
        var $id = guid();

        // Window Template
        $window =   $('<div class="window" id="' + $id + '"></div>');
        $menubar =      $('<div class="menubar"></div>');
        $title =            $('<div class="title"></div>');
        $controls =         $('<div class="controls"></div>');
        $ui_min =               $('<span id="minimize"><i class="material-icons">remove</i></span>');
        $ui_max =               $('<span id="maximize"><i class="material-icons">add</i></span>');
        $ui_close =             $('<span id="close"><i class="material-icons">close</i></span>');
        $content =      $('<div class="content"></div>');

        // Build Window
        $window.addClass((object.theme) ? object.theme : "light");
        $title.text(object.title);
        $content.height(object.height);
        $content.width(object.width);
        $content.html(object.content);

        $controls.append($ui_min);
        $controls.append($ui_max);
        $controls.append($ui_close);
        $menubar.append($title);
        $menubar.append($controls);
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
            var all_false = true;
            for (var i in windows[object.app]) {
                if (i == true) {
                    all_false = false;
                    break;
                }
            }

            if (all_false) $("#" + object.app).removeClass("active");
        });
    }
    
    this.Notification = function(object) {
        console.log("NOTIFICATION INIT");
    }
    
    this.Toast = function(object) {
        console.log("TOAST INIT");
    }
    
    this.Alert = function(object) {
        var $id = guid();
        
        // Alert Template
        $alert =        $('<div class="alert" id="' + $id + '"></div>');
        $title =            $('<div class="title"></div>');
        $message =          $('<div class="message"></div>');
        $action =           $('<div class="action"></div>');
        $action_btn =           $('<button class="btn">OK</button>');
        
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
    }
}

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