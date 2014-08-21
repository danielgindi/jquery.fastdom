// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://closure-compiler.googlecode.com/git/contrib/externs/jquery-1.9.js
// ==/ClosureCompiler==
/** @preserve    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
*/
(function($){
        
    function touchById(touches, touchId) {
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === touchId) return touches[i];
        }
        return null;
    }
	
	var acceptTagNames = {
		'A': true,
		'INPUT': true,
		'LABEL': true,
		'BUTTON': true,
		'SELECT': true
	};
    
    $(window).on('touchstart.fastdom', function (event) {
    
        var interactive = event.originalEvent.changedTouches[0].target;
        while (interactive && interactive.tagName in acceptTagNames) {
            interactive = interactive.parentNode;
        }
        if (!interactive || /\bfastdom-ignore\b/.test(interactive.className)) return; // Skip this element
        
        var touchId = event.originalEvent.changedTouches[0].identifier,
            didScroll = false, 
            scrollHandler = function () {
                didScroll = true;
            },
            active = true;
        
        var onCancel = function () {
            $this
                .removeClass('active') // Remove active class
                .off('.fastdom'); // Unhook events
                
            $(window).off('scroll.fastdom', scrollHandler) // Stop tracking scroll
        };
        
        $(window).on('scroll.fastdom', scrollHandler); // Start tracking scroll to prevent "click" after scroll

        var $this = $(interactive).addClass('active') // Add active class
         
        $this
            .addClass('active') // Add active class
            .on('touchmove.fastdom', function (event) { // Start tracking touch movement to see if we are still on top
            
                var touch = touchById(event.originalEvent.changedTouches, touchId);
                if (!touch) return;

                var element = document.elementFromPoint(touch.pageX, touch.pageY);
                active = element && (this === element || $.contains(this, element));
                $this.toggleClass('active', active);
                
            }).on('touchend.fastdom', function (event) {
            
                var touch = touchById(event.originalEvent.changedTouches, touchId);
                if (!touch) return;
                
                onCancel();
                
                if (active && !didScroll && !event.isDefaultPrevented()) {
                    this.click(); // Trigger native event
                    event.preventDefault();
                }
                
            }).on('touchcancel.fastdom', onCancel);
    
    });

})(jQuery);
