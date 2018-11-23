define([ 'as', './class', 'text!./template.htpl', './entry/builder' ], function(as, Class, template, entryBuilder) {
	"use strict";

	function list(context, name) {

		var properties = {
			template : template,
			container : 'collection',
			entryBuilder : entryBuilder
		};

		return as.generics.list.builder(context, name, properties, Class);
	}

	return list;
});