define([ 'core/primitives' ], function(primitives) {
	"use strict";

	/*
	 * ------------- GENEGIC BUTTON CLASS --------------
	 */
	function Button(context, name, template) {
		primitives.Button.call(this, context, name, template);
	}
	Button.prototype = Object.create(primitives.Button.prototype);
	Button.prototype.constructor = Button;

	Button.prototype.setActiveStatus = function(state) {
		this.element.toggleClass('control-active', [ 'active' ].includes(state));
		this.element.toggleClass('control-inactive', [ 'inactive' ].includes(state));

		return primitives.Button.prototype.setActiveStatus.call(this, state);
	}

	Button.prototype.isValid = function() {
		var flag = this.validator(this);
		this.element.toggleClass('control-error', !flag);
		return flag;
	}

	Button.prototype.fire = function() {
		this.element.removeClass('control-error');
		return primitives.Button.prototype.fire.call(this);
	}

	return Button;
});