/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-06-09
*/
(function(c){function g(){e=!0}function h(d,c){for(var b=0;b<d.length;b++)if(d[b].identifier===c)return d[b];return null}var e=!1;c(window).on("touchstart.fastanchor",function(d){if("A"===d.target.tagName){var k=d.originalEvent.changedTouches[0].identifier,b=!0;e=!1;var l=function(){f.removeClass("active").off(".fastanchor");c(window).off("scroll.fastanchor",g)};c(window).on("scroll.fastanchor",g);var f=c(d.target).addClass("active");f.on("touchmove.fastanchor",function(a){if(a=h(a.originalEvent.changedTouches,
k))b=(a=document.elementFromPoint(a.pageX,a.pageY))&&(this===a||c.contains(this,a)),f.toggleClass("active",b)}).on("touchend.fastanchor",function(a){h(a.originalEvent.changedTouches,k)&&(l(),b&&!e&&(this.click(),a.preventDefault()))}).on("touchcancel.fastanchor",l)}})})(jQuery);
