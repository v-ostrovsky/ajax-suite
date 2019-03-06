define([ 'as' ], function(as) {
	"use strict";

	var Class = as.generics.entry.Class;

	function Entry(context, template) {
		Class.call(this, context, template);
	}
	Entry.prototype = Object.create(Class.prototype);
	Entry.prototype.constructor = Entry;

	Entry.prototype.getView = function() {
		return this.tabLoop[0].getValue();
	}

	Entry.prototype.setActiveStatus = function(state) {
		this.controls['textId'].element.toggleClass('control-active', [ 'active' ].includes(state));
		this.controls['textId'].element.toggleClass('control-inactive', [ 'inactive' ].includes(state));

		return Class.prototype.setActiveStatus.call(this, state);
	}

	return Entry;
});