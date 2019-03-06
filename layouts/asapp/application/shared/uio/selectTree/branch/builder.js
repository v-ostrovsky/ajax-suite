define([ 'as', './class', 'text!./template.htpl' ], function(as, Class, template) {
	"use strict";

	function treeBranch(context) {

		var properties = {
			template : template,
			container : 'node'
		};

		return new as.generics.treeBranch.builder(context, 'selectTreeCollection', properties, Class);
	}

	return treeBranch;
});