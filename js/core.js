$(document).ready(function() {
    var popovers = {
        apps: false,
        meta: false
    };

    // Disable Right Click
    $(document).on("contextmenu", function(e) {
        //e.preventDefault();
        // return false;
    });

    $(document).bind("click", function(e) {
        // return false;
    });

    // App Launcher
    $("#app_launcher").click(function() {
        if (popovers.apps) {
            $(".launcher").fadeOut(20);
            popovers.apps = false;
        } else if (!popovers.apps) {
            $(".launcher").fadeIn(10);
            popovers.apps = true;
        }
    });

    // Metabar Popover
    $("#meta_launcher").click(function() {
        if (popovers.meta) {
            $(".metabar-popover").fadeOut(20);
            popovers.meta = false;
        } else if (!popovers.meta) {
            $(".metabar-popover").fadeIn(10);
            popovers.meta = true;
        }
    });

    // System Clock
    function clock() { $("#meta_time").text(moment().format("h:mm A")); }
    setInterval(clock, 1000);
    clock();
});

$(window).load(function() {
    // Notification
    new OS().Notification({
        title: "System",
        icon: "./icons/system.png",
        message: "Initialization Complete"
    });

    // Alert
    /*setTimeout(function() {
        new OS().Alert({
            title: "地震警報",
            message: "緊急地震速報<br>岩手県で地震発生。強い揺れに備えて下さい（気象庁）"
        });
    }, 1000);*/
});
