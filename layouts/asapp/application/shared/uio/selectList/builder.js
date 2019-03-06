define([ 'as', './class', 'text!./template.htpl', './entry/builder' ], function(as, Class, template, entryBuilder) {
	"use strict";

	function list(context, viewBuilder) {
		viewBuilder = viewBuilder || function(context, name) {
			return as.generics.button.builder(context, name, {});
		}

		function entryBuilderBound(context, attributes) {
			return entryBuilder(context, attributes, viewBuilder);
		}

		var properties = {
			template : 'create:' + template,
			container : 'selectListCollection',
			entryBuilder : entryBuilderBound
		};

		return as.generics.list.builder(context, '', properties, Class);
	}

	return list;
});