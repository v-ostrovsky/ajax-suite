define([ './primitives' ], function(primitives) {
	"use strict";

	/*
	 * ------------- DROPDOWN INPUT CLASS --------------
	 */
	function DropdownInput(context, name, template) {
		primitives.Input.call(this, context, name, template);

		var findItemByText = function(text) {
			return this.context.select.forEach(function(item) {
				if (item.getView().toUpperCase().startsWith(text.toUpperCase())) {
					return item;
				}
			}.bind(this)) || null;
		}.bind(this);

		this.backupValue = null;
		this.element.on({
			keydown : function(event) {
				if ([ 27 ].includes(event.which)) {
					if (this.backupValue) {
						this.context.setValue(this.backupValue);
						this.backupValue = null;
					}
				}
			}.bind(this),
			input : function(event) {
				this.backupValue = this.backupValue || this.context.getValue();
				if (event.originalEvent.data) {
					var inputText = this.element.val(), item = findItemByText(inputText);
					if (item) {
						this.context.setValue(item.focus().getValue());
						this.focus().setSelectionRange(inputText.length, item.getView().length);
					}
				} else {
					this.element.val() ? null : this.context.setValue(null);
				}
			}.bind(this),
			change : function(event) {
				this.setValue(this.context.select.activeElement ? this.context.select.activeElement.getView() : null);
				this.backupValue = null;
			}.bind(this)
		});
	}
	DropdownInput.prototype = Object.create(primitives.Input.prototype);
	DropdownInput.prototype.constructor = DropdownInput;

	return DropdownInput;
});