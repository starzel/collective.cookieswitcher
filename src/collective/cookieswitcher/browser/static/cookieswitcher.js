var piwikAjaxOptOutIsTracked = true;

/**
 * Activate tracking for the user.
 *
 * @author Oliver Lippert <oliver@lipperts-web.de>
 */
function piwikAjaxOptOutTrack () {
    $.ajax({
        url:      piwikUrl + "index.php?module=API&method=AjaxOptOut.doTrack&format=json",
        jsonp:    "callback",
        dataType: "jsonp",
        success:  function (d) {
            piwikAjaxOptOutIsTracked = true;
            updateButton();
        }
    });
}

/**
 * Deactivate tracking for the user.
 *
 * @author Oliver Lippert <oliver@lipperts-web.de>
 */
function piwikAjaxOptOutUntrack () {
    $.ajax({
        url:      piwikUrl + "index.php?module=API&method=AjaxOptOut.doIgnore&format=json",
        jsonp:    "callback",
        dataType: "jsonp",
        success:  function (d) {
            piwikAjaxOptOutIsTracked = false;
            updateButton();
        }
    });
}

/**
 * Update status text by tracking status.
 *
 * @author Oliver Lippert <oliver@lipperts-web.de>
 */
function updateButton() {
    if (piwikAjaxOptOutIsTracked === true) {
        $('#matomoAjaxOptButton')
            .removeClass("off")
            .addClass("on");
    } else {
        $('#matomoAjaxOptButton')
            .removeClass("on")
            .addClass("off");
    }
}

$(document)
    .ready(function () {
        // Always opt out authenticated user
        if($('body.userrole-authenticated').length  == 1) {
            piwikAjaxOptOutUntrack();
        }
        // Add listener for the "do track" button.
        $('#matomoAjaxOptButton').click(function (e) {
            if (piwikAjaxOptOutIsTracked === true) {
                e.preventDefault();
                e.stopPropagation();
                piwikAjaxOptOutUntrack();
            } else {
                 e.preventDefault();
                e.stopPropagation();
                piwikAjaxOptOutTrack();

            }
        });

        // Retrieve initial status from piwik installation.
        $.ajax({
            url:      piwikUrl + "index.php?module=API&method=AjaxOptOut.isTracked&format=json",
            jsonp:    "callback",
            dataType: "jsonp",
            success:  function (d) {
                piwikAjaxOptOutIsTracked = d.value;
                updateButton();
            }
        });
    });
