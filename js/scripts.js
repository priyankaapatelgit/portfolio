

(function ($) {
    'use strict';

    // Counter init
    if ($('.counter').length) {
        $('.counter').countTo();
    }

    //preloader
    $(window).on('load', function () {
        $("#tc-loader").delay(2500).fadeOut(500);
    })

})(jQuery);