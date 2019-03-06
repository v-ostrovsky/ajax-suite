define([ './class' ], function(Input) {
	"use strict";

	function input(context, name, properties, Class) {
		var input = new (Class || Input)(context, name, properties.template);
		(typeof properties.handler === 'function') ? input.setHandler(properties.handler) : null;
		(typeof properties.calculator === 'function') ? input.setCalculator(properties.calculator) : null;
		(typeof properties.formatter === 'function') ? input.setFormatter(properties.formatter) : null;
		(typeof properties.validator === 'function') ? input.setValidator(properties.validator) : null;
		(typeof properties.tooltip === 'string') ? input.setTooltip(properties.tooltip) : null;
		(typeof properties.inputMaskBuilder === 'function') ? input.setInputMask(properties.inputMaskBuilder) : null;
		(properties.defaultValue != undefined) ? input.setValue(properties.defaultValue) : null;
		(typeof properties.text === 'string') ? input.setLabel(name, properties.text) : null;

		return input;
	}

	return input;
});