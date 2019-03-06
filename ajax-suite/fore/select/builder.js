define([ './class' ], function(Select) {
	"use strict";

	function select(context, name, properties, Class) {
		var select = new (Class || Select)(context, name, properties.contentBuilder);
		(typeof properties.handler === 'function') ? select.setHandler(properties.handler) : null;
		(typeof properties.validator === 'function') ? select.setValidator(properties.validator) : null;
		(properties.defaultValue != undefined) ? select.setValue(properties.defaultValue) : null;
		(typeof properties.text === 'string') ? select.setLabel(properties.text) : null;

		if (properties.data) {
			if (typeof properties.dataProcessor != 'function') {
				select.setContent(properties.data);
			} else {
				// select.repository.storeData(properties.data, properties.dataProcessor);
			}
		}

		return select;
	}

	return select;
});