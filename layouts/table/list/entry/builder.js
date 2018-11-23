define([ 'as', './class', 'text!./template.htpl' ], function(as, Class, template) {
	"use strict";

	function entry(context, attributes) {

		var controls = [];

		var contextmenuItems = [ 'remove', 'edit', 'create' ].map(function(item) {
			return {
				name : item,
				text : as.locale.contextmenu[item].text,
				hotkey : as.locale.contextmenu[item].hotkey,
				handler : function(source) {
					source.root[item]();
				},
				disabled : true
			};
		});

		var properties = {
			template : template,
			controls : controls,
			handleBuilder : as.generics.tableHandle.builder,
			contextmenuItems : contextmenuItems,
			attributes : attributes
		};

		return as.generics.tableListEntry.builder(context, properties, Class);
	}

	return entry;
});