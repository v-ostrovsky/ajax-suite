define([ 'as', './class', 'text!./template.htpl' ], function(as, Form, template) {
	"use strict";

	function form(context, name, properties, Class) {

		var controls = [];

		properties = Object.assign(properties, {
			template : template,
			controls : controls,
			header : (properties.attributes.id) ? as.locale.form.titleEdit : as.locale.form.titleCreate
		});

		return as.generics.form.builder(context, name, properties, (Class || Form));
	}

	return form;
});