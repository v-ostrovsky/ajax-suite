define([ 'as', './class', 'text!./template.htpl' ], function(as, Form, template) {
	"use strict";

	function form(context, name, properties, Class) {

		var controls = [];

		properties.controls = controls;

		return as.generics.form.builder(context, name, properties, (Class || Form));
	}

	return form;
});