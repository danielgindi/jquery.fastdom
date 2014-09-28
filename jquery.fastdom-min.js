/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765
    MIT License!
*/
(function(f){function h(d,a){for(var c=0;c<d.length;c++)if(d[c].identifier===a)return d[c];return null}var p={A:!0,INPUT:!0,LABEL:!0,BUTTON:!0,SELECT:!0};f(window).on("touchstart.fastdom",function(d){for(var a=d.originalEvent.changedTouches[0].target;a&&a.tagName in p;)a=a.parentNode;if(a&&!/\bfastdom-ignore\b/.test(a.className)){var c=d.originalEvent.changedTouches[0].identifier,k=!1,l=function(){k=!0},g=!0,n=function(){e.removeClass("active").off(".fastdom");m.off("scroll.fastdom",l)},e=f(a).addClass("active"),
m=e.parents().add(window);m.on("scroll.fastdom",l);e.addClass("active").on("touchmove.fastdom",function(b){if(b=h(b.originalEvent.changedTouches,c))g=(b=document.elementFromPoint(b.pageX,b.pageY))&&(this===b||f.contains(this,b)),e.toggleClass("active",!!g)}).on("touchend.fastdom",function(b){if(h(b.originalEvent.changedTouches,c)&&(n(),g&&!k&&!b.isDefaultPrevented())){if(this.click)this.click();else{var a=document.createEvent("MouseEvent");a.initEvent("click",!0,!0);this.dispatchEvent(a)}b.preventDefault()}}).on("touchcancel.fastdom",
n)}})})(jQuery);