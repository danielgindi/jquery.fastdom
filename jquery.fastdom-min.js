/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
*/
(function(e){function h(d,b){for(var c=0;c<d.length;c++)if(d[c].identifier===b)return d[c];return null}var n={A:!0,INPUT:!0,LABEL:!0,BUTTON:!0,SELECT:!0};e(window).on("touchstart.fastdom",function(d){for(var b=d.originalEvent.changedTouches[0].target;b&&b.tagName in n;)b=b.parentNode;if(b){var c=d.originalEvent.changedTouches[0].identifier,k=!1,l=function(){k=!0},f=!0,m=function(){g.removeClass("active").off(".fastdom");e(window).off("scroll.fastdom",l)};e(window).on("scroll.fastdom",l);var g=e(b).addClass("active");
g.addClass("active").on("touchmove.fastdom",function(a){if(a=h(a.originalEvent.changedTouches,c))f=(a=document.elementFromPoint(a.pageX,a.pageY))&&(this===a||e.contains(this,a)),g.toggleClass("active",f)}).on("touchend.fastdom",function(a){h(a.originalEvent.changedTouches,c)&&(m(),!f||k||a.isDefaultPrevented()||(this.click(),a.preventDefault()))}).on("touchcancel.fastdom",m)}})})(jQuery);
