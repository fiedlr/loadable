/*! loadable v1.0.1 <github.com/fiedlr/loadable> | (c) 2016 Adam Fiedler | @license <opensource.org/licenses/MIT> */
;(function ($) {

	// Options
	var opts = {instances: 0},
		defaults = { 
			toggleClass: 	'loading',	// trigger's class while loading
			position: 		'parent', 	// custom loader's position (parent || this)
			container: 		false,		// custom loader's class
			content: 		null, 		// custom loader's content
			validate: 		function (f) {	// form validation
					if (typeof jQuery.fn.validate === 'function') {
						return f.valid();
					} else {
						for (var i = 0; i < f[0].elements.length; i++) {
							var field = f[0].elements[i];
							if ((field.nodeName === 'INPUT' || field.nodeName === 'TEXTAREA') && !field.checkValidity()) {
								return false;
							}
						}
					}
					return true;
				}
			};
			
	// Methods	
	var methods = {
		
		init: function (options) {

			// Setup
			options = $.extend({}, defaults, options);  

			// Make an instance if doesn't exist already
			if (typeof opts[options.toggleClass] !== 'undefined') {

				options.toggleClass += opts.instances;

			}

			// Save this setup
			opts[options.toggleClass] = options;

			// Assign a pointer
			this.data('toggleClass', options.toggleClass)
			// Add a custom container
			.loadable('refresh', options.position === 'this' ? this : this.parent());
	
			// Call handler
			if (!opts.instances) {
				$(document).bind('ajaxSend.loadable', function (e, xhr, settings) {
					
					// Get trigger and add it the loading class
					settings.loadingTrigger = $('.loadable:first').addClass(function () {
						var toggleClass = $(this).data('toggleClass'); 
						// Show the custom loader if any
						$('span.'+opts[toggleClass].container, opts[toggleClass].position === 'this' ? $(this) : $(this).parent()).show();
						// Add the toggleClass
						return toggleClass; 
					}).removeClass('loadable');
				
				}).bind('ajaxComplete.loadable', function (e, xhr, settings) {

					// Set the trigger to the original state
					settings.loadingTrigger.removeClass(function () {
						var toggleClass = $(this).data('toggleClass');
						// Hide the custom loader if any
						$('span.'+opts[toggleClass].container, opts[toggleClass].position === 'this' ? $(this) : $(this).parent()).hide();
						// Remove toggleClass
						return toggleClass;
					}).removeAttr('disabled');
				
				});
			}

			// Increment the number of instances
			opts.instances++;

			return this;
			
		},
		
		refresh: function (pos) {

			var selector = this.selector;

			// Refresh toggleClasses
			this.each(function () {
				if (!$(this).data('toggleClass')) {
				
					$(this).data('toggleClass', $(selector).filter(':first').data('toggleClass'));

				}
			});

			var toggleClass = $(this).data('toggleClass');

			// Save toggleClass information to load for AJAX handlers to be visible
			if ((typeof toggleClass === 'undefined' || typeof opts[toggleClass] === 'undefined')) {

				if (this.length) {
					$.error('loadable: Needs to initialize.');
					return;
				}

			// Add a custom container if needed
			} else if (opts[toggleClass].container !== false && !$('span.'+opts[toggleClass].container, pos).length) {

				// Add custom container
				$('<span />').addClass(opts[toggleClass].container).html(opts[toggleClass].content).hide().appendTo(pos);
				
			}

			// remove duplicites somehow
			$(this).on('click.loadable', function () {
	
				var f = $(this).closest('form');
				
				if (!f.length || opts[toggleClass].validate(f)) {
					// Raise a flag
					$(this).attr('disabled', true).addClass('loadable');
					// Submit if form and valid
					if (f.length) {
						f.submit();
					}
				}
			
			});
		
			return this;
			
		},
		
		// Turn off the trigger, remove all classes and custom loaders
		destroy: function () { 
			
			// Remove custom containers
			this.each(function () {
				$('span.'+opts[$(this).data('toggleClass')].container).remove();
			})
			// Remove all triggers and classes tied with the plugin
			.off('click.loadable').removeAttr('disabled').removeClass('loadable').data('toggleClass', '');
			
			return this;
			
		}
		
	};
	
	// Access
	$.fn.loadable = function (options) {
		
		if (methods[options]) {

			return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));

		} else if (typeof options === 'object' || !options) {

			return methods.init.apply(this, arguments);

		} else {

			$.error('loadable:' + options + ' needs to be an object or a method.');

		}    		
		
	};

}(jQuery));