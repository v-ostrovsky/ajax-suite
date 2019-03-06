define([ 'core/Dropdown', 'core/primitives' ], function(Class, primitives) {
	"use strict";

	/*
	 * ------------- GENEGIC DDROPDOWN CLASS --------------
	 */
	function Dropdown(context, name, displayBuilder) {
		Class.call(this, context, name, displayBuilder);
	}
	Dropdown.prototype = Object.create(Class.prototype);
	Dropdown.prototype.constructor = Dropdown;

	Dropdown.prototype.setActiveStatus = function(state) {
		this.display.element.toggleClass('control-active', [ 'active' ].includes(state));
		return Class.prototype.setActiveStatus.call(this, state);
	}

	Dropdown.prototype.isValid = function() {
		var flag = this.validator(this);
		this.display.element.toggleClass('control-error', !flag);
		return flag;
	}

	Dropdown.prototype.fire = function(data) {
		this.display.element.removeClass('control-error');
		return Class.prototype.fire.call(this, data);
	}

	Dropdown.prototype.setContent = function(data) {
		if (typeof data.execute === 'function') {
			this.dao = data.execute(function(response) {
				Class.prototype.setContent.call(this, response).setValue(this.value);
			}.bind(this));
		} else {
			Class.prototype.setContent.call(this, data);
		}

		return this;
	}

	Dropdown.prototype.setValue = function(value) {
		this.value = Class.prototype.setValue.call(this, value).getValue() || value;
		return this;
	}

	Dropdown.prototype.setLabel = function(text) {
		if (text) {
			this.label = new primitives.Label(this.context, '*/' + this.name + '-label', text);
		}

		return this;
	}

	return Dropdown;
});