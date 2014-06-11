/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-06-09
*/
(function(e){function h(d,b){for(var c=0;c<d.length;c++)if(d[c].identifier===b)return d[c];return null}e(window).on("touchstart.fastanchor",function(d){for(var b=d.originalEvent.changedTouches[0].target;b&&"A"!==b.tagName;)b=b.parentNode;if(b){var c=d.originalEvent.changedTouches[0].identifier,k=!1,l=function(){k=!0},f=!0,m=function(){g.removeClass("active").off(".fastanchor");e(window).off("scroll.fastanchor",l)};e(window).on("scroll.fastanchor",l);var g=e(b).addClass("active");g.addClass("active").on("touchmove.fastanchor",
function(a){if(a=h(a.originalEvent.changedTouches,c))f=(a=document.elementFromPoint(a.pageX,a.pageY))&&(this===a||e.contains(this,a)),g.toggleClass("active",f)}).on("touchend.fastanchor",function(a){h(a.originalEvent.changedTouches,c)&&(m(),!f||k||a.isDefaultPrevented()||(this.click(),a.preventDefault()))}).on("touchcancel.fastanchor",m)}})})(jQuery);
