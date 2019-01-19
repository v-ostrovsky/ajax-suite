define([ 'as', './class', 'text!./template.htpl' ], function(as, Class, template) {
	"use strict";

	function panel(context, name) {

		var controls = [];

		var properties = {
			template : template,
			controls : controls
		};

		return as.generics.panel.builder(context, name, properties, Class);
	}

	return panel;
});