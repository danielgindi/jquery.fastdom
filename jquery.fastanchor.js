// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://closure-compiler.googlecode.com/git/contrib/externs/jquery-1.9.js
// ==/ClosureCompiler==
/** @preserve    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-02-18
*/
(function($){
    
    var didScroll = false, scrollHandler = function () {
        didScroll = true;
    };
    
    $(window).on('touchstart.fastanchor', function (event) {
    
        if (event.target.tagName !== 'A') return; // Skip this element
        
        didScroll = false;
        $(window).on('scroll', scrollHandler);
        
        var $this = $(this)
                    .addClass('active') // Add hover class
        
        $this.on('touchend.fastanchor', function () {
            $this
                .removeClass('active') // Remove hover class
                .off('touchend.fastanchor') // Unhook touchend
                .off('touchcancel.fastanchor'); // Unhook touchcancel
            $(window).off('scroll', scrollHandler);
            
            if (!didScroll) {
                this.click(); // Trigger native event
            }
        }).on('touchcancel.fastanchor', function () {
            $this
                .removeClass('active') // Remove hover class
                .off('touchend.fastanchor') // Unhook touchend
                .off('touchcancel.fastanchor'); // Unhook touchcancel
            $(window).off('scroll', scrollHandler);
        });
    
    });

})(jQuery);