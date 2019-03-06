define([ 'as', './class', 'text!./template.htpl' ], function(as, Class, template) {
	"use strict";

	function entry(context, attributes, viewBuilder) {

		var controls = [ 'textId' ].map(function(item) {
			return {
				name : item,
				builder : function(context) {
					return viewBuilder(context, '*/' + item).setHandler(function(self) {
						self.context.focus().send('item:selected');
					});
				}
			};
		});

		var properties = {
			template : template,
			controls : controls,
			attributes : attributes
		};

		return as.generics.entry.builder(context, properties, Class);
	}

	return entry;
});