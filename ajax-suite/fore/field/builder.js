define([ './class' ], function(Field) {
	"use strict";

	function field(context, name, properties, Class) {
		var field = new (Class || Field)(context, name, properties.template);
		(typeof properties.handler === 'function') ? field.setHandler(properties.handler) : null;
		(typeof properties.calculator === 'function') ? field.setCalculator(properties.calculator) : null;
		(typeof properties.formatter === 'function') ? field.setFormatter(properties.formatter) : null;
		(typeof properties.validator === 'function') ? field.setValidator(properties.validator) : null;
		(typeof properties.tooltip === 'string') ? field.setTooltip(properties.tooltip) : null;
		(properties.defaultValue != undefined) ? field.setValue(properties.defaultValue) : null;
		(typeof properties.text === 'string') ? field.setLabel(name, properties.text) : null;

		return field;
	}

	return field;
});