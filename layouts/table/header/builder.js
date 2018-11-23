define([ 'as', './class', 'text!./template.htpl' ], function(as, Class, template) {
	"use strict";

	function header(context, name) {

		var fields = [];

		var properties = {
			template : template,
			fields : fields,
			handleBuilder : as.generics.tableHandle.builder
		};

		return as.generics.tableListHeader.builder(context, name, properties, Class);
	}

	return header;
});