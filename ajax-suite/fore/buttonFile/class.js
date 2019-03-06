define([ 'core/primitives' ], function(primitives) {
	"use strict";

	/*
	 * ------------- GENEGIC BUTTON FILE CLASS --------------
	 */
	function ButtonFile(context, name, template) {
		primitives.ButtonFile.call(this, context, name, template);
	}
	ButtonFile.prototype = Object.create(primitives.ButtonFile.prototype);
	ButtonFile.prototype.constructor = ButtonFile;

	ButtonFile.prototype.setActiveStatus = function(state) {
		this.element.toggleClass('control-active', [ 'active' ].includes(state));
		this.element.toggleClass('control-inactive', [ 'inactive' ].includes(state));

		return primitives.ButtonFile.prototype.setActiveStatus.call(this, state);
	}

	ButtonFile.prototype.isValid = function() {
		var flag = this.validator(this);
		this.element.toggleClass('control-error', !flag);
		return flag;
	}

	ButtonFile.prototype.fire = function() {
		this.element.removeClass('control-error');
		return primitives.ButtonFile.prototype.fire.call(this);
	}

	return ButtonFile;
});