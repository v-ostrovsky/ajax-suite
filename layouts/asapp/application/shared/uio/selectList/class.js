define([ 'as' ], function(as) {
	"use strict";

	var Class = as.generics.list.Class;

	function List(context, name, template, container, entryBuilder, daoBuilder) {
		Class.call(this, context, name, template, container, entryBuilder, daoBuilder);
	}
	List.prototype = Object.create(Class.prototype);
	List.prototype.constructor = List;

	List.prototype.on = function(control, eventType, data) {
		if ([ 'item:selected', 'control:tabulate', 'control:escape' ].includes(eventType) && (control.root === this)) {
			this.send(eventType, data);
			return false;
		}

		return Class.prototype.on.call(this, control, eventType, data);
	}

	List.prototype.setVisibility = function(flag) {
		if (flag) {
			Class.prototype.setVisibility.call(this, true);
			this.send('control:setVisibility', true);
		} else {
			this.send('control:setVisibility', false);
			Class.prototype.setVisibility.call(this, false);
		}

		return this;
	}

	List.prototype.getItem = function(value) {
		return (value != undefined) ? this.getEntryById(value) : this.activeElement;
	}

	return List;
});