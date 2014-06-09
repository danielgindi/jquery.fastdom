/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-06-09
*/
(function(b){function g(c,b){for(var d=0;d<c.length;d++)if(c[d].identifier===b)return c[d];return null}b(window).on("touchstart.fastanchor",function(c){if("A"===c.target.tagName){var h=c.originalEvent.changedTouches[0].identifier,d=!1,k=function(){d=!0},e=!0,l=function(){f.removeClass("active").off(".fastanchor");b(window).off("scroll.fastanchor",k)};b(window).on("scroll.fastanchor",k);var f=b(c.target).addClass("active");f.addClass("active").on("touchmove.fastanchor",function(a){if(a=g(a.originalEvent.changedTouches,
h))e=(a=document.elementFromPoint(a.pageX,a.pageY))&&(this===a||b.contains(this,a)),f.toggleClass("active",e)}).on("touchend.fastanchor",function(a){g(a.originalEvent.changedTouches,h)&&(l(),!e||d||a.isDefaultPrevented()||(this.click(),a.preventDefault()))}).on("touchcancel.fastanchor",l)}})})(jQuery);
