define([ 'core/primitives' ], function(primitives) {
	"use strict";

	/*
	 * ------------- GENEGIC INPUT CLASS --------------
	 */
	function Input(context, name, template) {
		primitives.Input.call(this, context, name, template);
	}
	Input.prototype = Object.create(primitives.Input.prototype);
	Input.prototype.constructor = Input;

	Input.prototype.setActiveStatus = function(state) {
		this.element.toggleClass('control-active', [ 'active' ].includes(state));
		return primitives.Input.prototype.setActiveStatus.call(this, state);
	}

	Input.prototype.isValid = function() {
		var flag = this.validator(this);
		this.element.toggleClass('control-error', !flag);
		return flag;
	}

	Input.prototype.fire = function() {
		this.element.removeClass('control-error');
		return primitives.Input.prototype.fire.call(this);
	}

	Input.prototype.setLabel = function(name, text) {
		if (text) {
			this.label = new primitives.Label(this.context, name + '-label', text);
		}

		return this;
	}

	return Input;
});