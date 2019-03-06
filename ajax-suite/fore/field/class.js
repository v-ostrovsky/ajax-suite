define([ 'core/primitives' ], function(primitives) {
	"use strict";

	/*
	 * ------------- GENEGIC FIELD CLASS --------------
	 */
	function Field(context, name, template) {
		primitives.Field.call(this, context, name, template);
	}
	Field.prototype = Object.create(primitives.Field.prototype);
	Field.prototype.constructor = Field;

	Field.prototype.setLabel = function(name, text) {
		if (text) {
			this.label = new primitives.Label(this.context, name + '-label', text);
		}

		return this;
	}

	return Field;
});