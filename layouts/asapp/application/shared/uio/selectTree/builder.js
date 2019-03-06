define([ 'as', './class', 'text!./template.htpl', './entry/builder', './branch/builder' ], function(as, Class, template, entryBuilder, branchBuilder) {
	"use strict";

	function tree(context, viewBuilder) {
		viewBuilder = viewBuilder || function(context, name) {
			return as.generics.button.builder(context, name, {});
		}

		function entryBuilderBound(context, attributes) {
			return entryBuilder(context, attributes, viewBuilder);
		}

		var properties = {
			template : template,
			container : 'node',
			entryBuilder : entryBuilderBound,
			branchBuilder : branchBuilder
		};

		return as.generics.tree.builder(context, '', properties, Class);
	}

	return tree;
});