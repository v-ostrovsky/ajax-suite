define([ 'core/primitives' ], function(primitives) {
	"use strict";

	/*
	 * ------------- GENEGIC BUTTON TOGGLE CLASS --------------
	 */
	function ButtonToggle(context, name, template) {
		primitives.ButtonToggle.call(this, context, name, template);
	}
	ButtonToggle.prototype = Object.create(primitives.ButtonToggle.prototype);
	ButtonToggle.prototype.constructor = ButtonToggle;

	ButtonToggle.prototype.setActiveStatus = function(state) {
		this.element.toggleClass('control-active', [ 'active' ].includes(state));
		this.element.toggleClass('control-inactive', [ 'inactive' ].includes(state));

		return primitives.ButtonToggle.prototype.setActiveStatus.call(this, state);
	}

	ButtonToggle.prototype.isValid = function() {
		var flag = this.validator(this);
		this.element.toggleClass('control-error', !flag);
		return flag;
	}

	ButtonToggle.prototype.fire = function() {
		this.element.removeClass('control-error');
		return primitives.ButtonToggle.prototype.fire.call(this);
	}

	return ButtonToggle;
});