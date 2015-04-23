// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/jquery-1.9.js
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
		//'INPUT': true, // Does not seem to work for TEXT boxes
		'LABEL': true,
		'BUTTON': true
		//'SELECT': true // Does not seem to really work
	};

    $(window).on('touchstart.fastdom', function (event) {

        var interactive = event.originalEvent.changedTouches[0].target;
        while (interactive && !((interactive.tagName in acceptTagNames) || (interactive.tagName === 'input' && /^radio|checkbox$/g.test(interactive.type)))) {
            interactive = interactive.parentNode;
        }
        if (!interactive || /\bfastdom-ignore\b/.test(interactive.className) || (interactive.tagName === 'LABEL' && !this.click)) return; // Skip this element

        var touchId = event.originalEvent.changedTouches[0].identifier,
            didScroll = false,
            scrollHandler = function () {
                didScroll = true;
            },
            active = true,
            ghostBuster = 0; // Some Android browsers to not support preventDefault(), we need to do catch the ghost events

        var onCancel = function (event) {
            $this
                .removeClass('active') // Remove active class
                .off('touchmove.fastdom') // Unhook touchmove
                .off('touchend.fastdom') // Unhook touchend
                .off('touchcancel.fastdom'); // Unhook touchcancel

            if (event.type === 'touchcancel') {
                $this.off('mousedown.fakebutton');
            }

            trackedScrolling.off('scroll.fastdom', scrollHandler) // Stop tracking scroll
        };

        var $this = $(interactive);

        var trackedScrolling = $this.parents().add(window);
        trackedScrolling.on('scroll.fastdom', scrollHandler); // Start tracking scroll to prevent "click" after scroll

        $this
            .addClass('active') // Add active class
            .on('touchmove.fastdom', function (event) { // Start tracking touch movement to see if we are still on top

                var touch = touchById(event.originalEvent.changedTouches, touchId);
                if (!touch) return;

                var element = document.elementFromPoint(touch.pageX, touch.pageY);
                active = element && (this === element || $.contains(this, element));
                $this.toggleClass('active', !!active);

            }).on('touchend.fastdom', function (event) {

                var touch = touchById(event.originalEvent.changedTouches, touchId);
                if (!touch) return;

                onCancel(event);

                if (active && !didScroll && !event.isDefaultPrevented() && document.contains(this)) {
                    if (this.click) {
                        this.click(); // Trigger native event
                    } else { // Android Chrome and Android Browser are special!
                        var clickEvent = document.createEvent('MouseEvent');
                        clickEvent.initEvent('click', true, true);
                        this.dispatchEvent(clickEvent);
                    }
                    event.preventDefault();
                }

            }).on('touchcancel.fastdom', onCancel)
            .on('mousedown.fastdom', function (event) {
                if ((+new Date - ghostBuster) <= 500) { // Bust the ghost mouse events on old Android browsers
                    event.preventDefault();
                    event.stopPropagation();
                }
                $this.off('mousedown.fastdom');
            })

    });

})(jQuery);
