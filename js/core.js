$(document).ready(function() {
    var popovers = {
        apps: false,
        meta: false
    };

    // Disable Right Click
    $(document).on("contextmenu", function() {
        //return false;
    });

    // Apps Popover
    $("#app_launcher").click(function() {
        if (popovers.apps) {
            $(".apps-popover").fadeOut(20);
            popovers.apps = false;
        } else if (!popovers.apps) {
            $(".apps-popover").fadeIn(10);
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
});