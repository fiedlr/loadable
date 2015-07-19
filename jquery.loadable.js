/*! loadable v0.9.0 <www.github.com/fiedlr/loadable> 
		Copyright (c) 2015 Adam Fiedler
		Released under the MIT License <www.mit-license.org> */
;(function ($) {

	// Options
	var opts = {},
			defaults = { 
				toggleClass: 	'loading',			// trigger's class while loading
				flagClass:		'loadable',			// raised flag before AJAX request
				container:		false,					// custom loader's class
				position: 		'parent', 			// custom loader's position (parent || this)
				content: 			null, 					// custom loader's content
				validate:			function (f) {	// form validation
					if (typeof jQuery.fn.validate == 'function')
						return f.valid();
					else {
						for (i = 0; i < f[0].elements.length; i++) {
							var field = f[0].elements[i];
							if ((field.nodeName == 'INPUT' || field.nodeName == 'TEXTAREA') && !field.checkValidity())
							return false;
						}
					}
					return true;
				}
			};
			
	// Methods	
	var methods = {
		
		init: function (options) {

			// Setup
			$.extend(opts, defaults, options);
			var pos = (opts.position === 'this' ? this : this.parent());
			
			// Refresh custom containers
			methods.refresh(pos);
		
			// React to clicks
			this.click(function () {
		
				var f = $(this).closest('form');
				if (!f.length || opts.validate(f)) {
					// Raise a flag
					$(this).attr('disabled', true).addClass(opts.flagClass);
					// Submit if form and valid
					if (f.length) {
						f.submit();
					}
				}
			
			});
			
			// Handle AJAX calls
			$(document).bind('ajaxSend', function (e, xhr, settings) {
				
				settings.loadingTrigger = $('.'+opts.flagClass+':first').removeClass(opts.flagClass).addClass(opts.toggleClass);
				$('span.'+opts.container, settings.loadingTrigger.parent()).show();
				
			}).bind('ajaxComplete', function (e, xhr, settings) { 
						
				$('span.'+opts.container, settings.loadingTrigger.parent()).hide();
				settings.loadingTrigger.removeClass(opts.toggleClass).removeAttr('disabled');
			
			});
	
			// Chaining
			return this;
			
		},
		
		refresh: function (pos) {
			
			if (opts.container !== false && !$('.'+opts.container, pos).length) 
			$('<span />').addClass(opts.container).html(opts.content).appendTo(pos);
		
			return this;
			
		},
		
		// Turn off the trigger, remove all classes and custom loaders
		destroy: function () { 
			
			this.off('click').removeClass(opts.toggleClass).removeClass(opts.flagClass).removeAttr('disabled');
			$('span.'+opts.container).remove();
			
			return this;
			
		}
		
	};
	
	// Access
	$.fn.loadable = function (options) {
		
		if ( methods[options] ) {
			// Calling a method
			return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof options === 'object' || !options ) {
			// Constructor
			return methods.init.apply( this, arguments );
		} else {
			// Error
			$.error(options + ' needs to be an object or a method.');
		}    		
		
	}

}(jQuery));
