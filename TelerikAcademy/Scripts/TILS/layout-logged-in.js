$(function () {
    var notificationsAreDisplayed = false;
    var closeSpeed = 100;

    $('body').on('click', function () {
        $('#NotificationsList').hide();
        notificationsAreDisplayed = false;
    });

    $('#NotificationsIconContainer').on('click', function (e) {
        e.stopImmediatePropagation();
        if (!notificationsAreDisplayed) {
            $('#NotificationsList').slideDown(350);
            notificationsAreDisplayed = true;
        } else {
            $('#NotificationsList').slideUp(closeSpeed);
            notificationsAreDisplayed = false;
        }
    });

    $('#HeaderUserPanel').on('click', function (e) {
        e.stopImmediatePropagation();
    });

    $('#NotificationsList').on('click', function (e) {
        e.stopImmediatePropagation();
    });

    $('.notification').on('click', function (e) {
        var id = $(this).data('notification-id');
        var url = $(this).data('url');

        $.get('/Users/Notifications/ReadNotification/' + id, null, function () {
            location.href = url;
        });
    });

    $('#ReadAllButton').on('click', function () {
        if ($('.unreadIcon').length == 0) {
            $('#NotificationsList').slideUp(closeSpeed);
            notificationsAreDisplayed = false;
            return;
        }

        $.get('/Users/Notifications/ReadAllNotifications', null, function () {
            notificationsAreDisplayed = false;
            $('#NotificationsList').slideUp(closeSpeed);
            $('#UnreadCount').hide();
            $('#NotificationsIcon').removeClass('text-danger');
            $('.unreadIcon').css('background-color', '#777');
            $('.unreadIcon').removeClass('unreadIcon');
        });
    });
});