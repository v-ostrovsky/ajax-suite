define([ './class' ], function(Dropdown) {
	"use strict";

	function dropdown(context, name, properties, Class) {
		var dropdown = new (Class || Dropdown)(context, name, properties.displayBuilder).setSelect(properties.selectBuilder);

		(typeof properties.handler === 'function') ? dropdown.setHandler(properties.handler) : null;
		(typeof properties.calculator === 'function') ? dropdown.setCalculator(properties.calculator) : null;
		(typeof properties.validator === 'function') ? dropdown.setValidator(properties.validator) : null;
		(properties.tooltip != undefined) ? dropdown.setTooltip(properties.tooltip) : null;
		(properties.withClear === true) ? dropdown.showClear() : null;
		(properties.defaultValue != undefined) ? dropdown.setValue(properties.defaultValue) : null;
		(typeof properties.text === 'string') ? dropdown.setLabel(properties.text) : null;

		if (properties.data) {
			if (typeof properties.dataProcessor != 'function') {
				dropdown.setContent(properties.data);
			} else {
				// dropdown.repository.storeData(properties.data, properties.dataProcessor);
			}
		}

		return dropdown;
	}

	return dropdown;
});