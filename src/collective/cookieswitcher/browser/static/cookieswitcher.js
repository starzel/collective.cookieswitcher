var matomoAjaxOptOutIsTracked = true;

/**
 * Activate tracking for the user.
 *
 * @author Oliver Lippert <oliver@lipperts-web.de>
 */
function matomoAjaxOptOutTrack () {
    $.ajax({
        url:      matomoUrl + "index.php?module=API&method=AjaxOptOut.doTrack&format=json",
        jsonp:    "callback",
        dataType: "jsonp",
        success:  function (d) {
            matomoAjaxOptOutIsTracked = true;
            updateButton();
        }
    });
}

/**
 * Deactivate tracking for the user.
 *
 * @author Oliver Lippert <oliver@lipperts-web.de>
 */
function matomoAjaxOptOutUntrack () {
    $.ajax({
        url:      matomoUrl + "index.php?module=API&method=AjaxOptOut.doIgnore&format=json",
        jsonp:    "callback",
        dataType: "jsonp",
        success:  function (d) {
            matomoAjaxOptOutIsTracked = false;
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
    if (matomoAjaxOptOutIsTracked === true) {
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
            matomoAjaxOptOutUntrack();
        }
        // Add listener for the "do track" button.
        $('#matomoAjaxOptButton').click(function (e) {
            if (matomoAjaxOptOutIsTracked === true) {
                e.preventDefault();
                e.stopPropagation();
                matomoAjaxOptOutUntrack();
            } else {
                 e.preventDefault();
                e.stopPropagation();
                matomoAjaxOptOutTrack();

            }
        });

        // Retrieve initial status from matomo installation.
        $.ajax({
            url:      matomoUrl + "index.php?module=API&method=AjaxOptOut.isTracked&format=json",
            jsonp:    "callback",
            dataType: "jsonp",
            success:  function (d) {
                matomoAjaxOptOutIsTracked = d.value;
                updateButton();
            }
        });
    });
