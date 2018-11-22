define([ 'as', './class', 'text!./template.htpl' ], function(as, Class, template) {
	"use strict";

	function application() {

		var properties = {
			template : template
		};

		return as.generics.application.builder(properties, Class);
	}

	return application;
});