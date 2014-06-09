/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-02-18
*/
(function(a){function b(){c=!0}var c=!1;a(window).on("touchstart.fastanchor",function(e){if("A"===e.target.tagName){c=!1;a(window).on("scroll",b);var d=a(this).addClass("active");d.on("touchend.fastanchor",function(){d.removeClass("active").off("touchend.fastanchor").off("touchcancel.fastanchor");a(window).off("scroll",b);c||this.click()}).on("touchcancel.fastanchor",function(){d.removeClass("active").off("touchend.fastanchor").off("touchcancel.fastanchor");a(window).off("scroll",b)})}})})(jQuery);
