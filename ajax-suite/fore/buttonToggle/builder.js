define([ './class' ], function(ButtonToggle) {
	"use strict";

	function buttonToggle(context, name, properties, Class) {
		var button = new (Class || ButtonToggle)(context, name, properties.template);
		var arr = name.split('/'), method = arr[arr.length - 1], handler = (typeof properties.handler === 'function') ? properties.handler.bind(context) : (context[method] ? context[method].bind(context) : null);
		(typeof handler === 'function') ? button.setHandler(handler) : null;
		(typeof properties.calculator === 'function') ? button.setCalculator(properties.calculator) : null;
		(typeof properties.formatter === 'function') ? button.setFormatter(properties.formatter) : null;
		(typeof properties.validator === 'function') ? button.setValidator(properties.validator) : null;
		(properties.tooltip != undefined) ? button.setTooltip(properties.tooltip) : null;
		(properties.content != undefined) ? button.setContent(properties.content) : null;
		(properties.defaultValue != undefined) ? button.setValue(properties.defaultValue) : null;
		button.toggle(properties.defaultState);

		return button;
	}

	return buttonToggle;
});