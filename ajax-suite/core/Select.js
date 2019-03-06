define([ './Control' ], function(Control) {
	"use strict";

	/*
	 * ------------- SELECT CLASS --------------
	 */
	function Select(context, name, contentBuilder) {
		Control.call(this, context, name);

		/* ------------ content ------------ */
		this.content = contentBuilder(this);

		this.content.element.css({
			'height' : '100%',
			'overflow-y' : 'auto'
		});

		/* ------------ this ------------ */
		this.validator = function(self) {
			return true;
		};
	}
	Select.prototype = Object.create(Control.prototype);
	Select.prototype.constructor = Select;

	Select.prototype.on = function(control, eventType, data) {
		if ([ 'control:changed', 'control:tabulate' ].includes(eventType) && (control === this.content)) {
			this.send(eventType, data);
			return false;
		}
		if ([ 'item:selected' ].includes(eventType) && (control === this.content)) {
			this.fire();
			return false;
		}
	}

	Select.prototype.getDefaultActiveElement = function() {
		return this.content;
	}

	Select.prototype.setHandler = function(handler) {
		this.handler = handler;
		return this;
	}

	Select.prototype.setValidator = function(validator) {
		this.validator = validator;
		return this;
	}

	Select.prototype.fire = function() {
		(typeof this.handler === 'function') ? this.handler(this) : this.send('control:changed');
	}

	Select.prototype.isValid = function() {
		return this.validator(this);
	}

	Select.prototype.setContent = function(data) {
		this.content.setContent(data);
		return this;
	}

	Select.prototype.getContent = function() {
		return this.content;
	}

	Select.prototype.setValue = function(value) {
		this.content.setValue(value);
		return this;
	}

	Select.prototype.getValue = function() {
		return this.content.getValue();
	}

	return Select;
});