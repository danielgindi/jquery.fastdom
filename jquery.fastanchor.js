// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://closure-compiler.googlecode.com/git/contrib/externs/jquery-1.9.js
// ==/ClosureCompiler==
/** @preserve    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-06-09
*/
(function($){
    
    var didScroll = false, scrollHandler = function () {
        didScroll = true;
    };
    
    function touchById(touches, touchId) {
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === touchId) return touches[i];
        }
        return null;
    }
    
    $(window).on('touchstart.fastanchor', function (event) {
    
        if (event.target.tagName !== 'A') return; // Skip this element
        
        var touchId = event.originalEvent.changedTouches[0].identifier,
            active = true;
        
        didScroll = false;
                    
        var onCancel = function () {
            $this
                .removeClass('active') // Remove active class
                .off('.fastanchor'); // Unhook events
                
            $(window)
                .off('scroll.fastanchor', scrollHandler) // Stop tracking scroll;
        };
        
        $(window)
            .on('scroll.fastanchor', scrollHandler); // Start tracking scroll to prevent "click" after scroll

        var $this = $(event.target)
                    .addClass('active') // Add active class
         
        $this.on('touchmove.fastanchor', function (event) { // Start tracking touch movement to see if we are still on top
        
            var touch = touchById(event.originalEvent.changedTouches, touchId);
            if (!touch) return;

            var element = document.elementFromPoint(touch.pageX, touch.pageY);
            active = element && (this === element || $.contains(this, element));
            $this.toggleClass('active', active);
            
        }).on('touchend.fastanchor', function (event) {
        
            var touch = touchById(event.originalEvent.changedTouches, touchId);
            if (!touch) return;
            
            onCancel();
            
            if (active && !didScroll) {
                this.click(); // Trigger native event
                event.preventDefault();
            }
            
        }).on('touchcancel.fastanchor', onCancel);
    
    });

})(jQuery);