define([ './class' ], function(Panel) {
	"use strict";

	function panel(context, name, properties, Class) {
		var panel = new (Class || Panel)(context, name, properties.template).send('setHeader', properties.header || '');
		(Array.isArray(properties.controls)) ? panel.setContent(properties.controls) : null;

		return panel;
	}

	return panel;
});