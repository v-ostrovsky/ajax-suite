define([ 'as', './frmEdit/builder' ], function(as, frmEditBuilder) {
	"use strict";

	var Class = as.generics.list.Class;

	function List(context, name, template, container, entryBuilder, daoBuilder) {
		Class.call(this, context, name, template, container, entryBuilder, daoBuilder);
	}
	List.prototype = Object.create(Class.prototype);
	List.prototype.constructor = List;

	List.prototype.create = function() {
		var attributes = {
			id : (this.activeElement) ? this.activeElement.attributes.id : null
		};

		Class.prototype.create.call(this, frmEditBuilder, attributes);
	}

	List.prototype.copy = function() {
		Class.prototype.copy.call(this, frmEditBuilder, this.activeElement.attributes);
	}

	List.prototype.edit = function() {
		Class.prototype.edit.call(this, frmEditBuilder, this.activeElement.attributes);
	}

	List.prototype.remove = function(header, message) {
		Class.prototype.remove.call(this, as.uio.frmConfirmBuilder, this.activeElement.attributes, header, message);
	}

	return List;
});