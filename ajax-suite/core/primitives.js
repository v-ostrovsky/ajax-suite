define([ './Control' ], function(Control) {
	"use strict";

	var primitives = {};

	/*
	 * ------------- LABEL CLASS --------------
	 */
	function Label(context, name, text) {
		Control.call(this, context, name);

		this.element.prepend(text || '');
	}
	Label.prototype = Object.create(Control.prototype);
	Label.prototype.constructor = Label;

	primitives.Label = Label;

	/*
	 * ------------- TOOLTIP CLASS --------------
	 */
	function Tooltip(element, text, mousePosition) {
		this.element = element;

		this.element.html(text).addClass('tooltip').css({
			'position' : 'absolute',
			'z-index' : '999'
		});

		var position = {
			left : mousePosition.clientX + 5,
			top : mousePosition.clientY - parseInt(this.element.outerHeight()) - 5
		};

		var exceeding = {
			left : position.left + parseInt(this.element.outerWidth()) - $(window).width() + 5,
			top : -position.top + 5
		};

		this.element.offset({
			'left' : position.left - ((exceeding.left > 0) ? exceeding.left : 0),
			'top' : position.top + ((exceeding.top > 0) ? exceeding.top : 0)
		});
	}

	primitives.Tooltip = Tooltip;

	/*
	 * ------------- FIELD CLASS --------------
	 */
	function Field(context, name, template) {
		Control.call(this, context, name, template);

		this.formatter = function(value) {
			return value;
		};

		this.validator = function(self) {
			return true;
		};
	}
	Field.prototype = Object.create(Control.prototype);
	Field.prototype.constructor = Field;

	Field.prototype._setTooltip_ = function(element, text) {
		var hoverEvent = null, mousePosition = {};

		function onMouseMove(event) {
			mousePosition = {
				clientX : event.clientX,
				clientY : event.clientY
			};
		};

		element.off('mouseenter mouseleave').on({
			mouseenter : function(event) {
				hoverEvent = event;
				$(document).on('mousemove', onMouseMove);

				setTimeout(function() {
					if (hoverEvent === event) {
						var tooltipElement = $('<div name="tooltip"></div>').appendTo(element.parent());
						this.tooltip = new Tooltip(tooltipElement, text, mousePosition);
					}
				}.bind(this), 1000);
			}.bind(this),
			mouseleave : function(event) {
				hoverEvent = null, mousePosition = {};
				$(document).off('mousemove', null, onMouseMove);

				if (this.tooltip) {
					this.tooltip.element.remove();
					delete this.tooltip;
				}
			}.bind(this)
		});

		return this;
	}

	Field.prototype.setHandler = function(handler) {
		this.handler = handler;
		return this;
	}

	Field.prototype.setCalculator = function(calculator) {
		this.calculator = calculator;
		return this;
	}

	Field.prototype.setFormatter = function(formatter) {
		this.formatter = formatter;
		return this;
	}

	Field.prototype.setValidator = function(validator) {
		this.validator = validator;
		return this;
	}

	Field.prototype.setTooltip = function(text) {
		return this._setTooltip_(this.element, text);
	}

	Field.prototype.isValid = function() {
		return this.validator(this);
	}

	Field.prototype.setValue = function(value) {
		this.value = (typeof this.calculator === 'function') ? this.calculator(value) : value;
		this.element.html(this.formatter(this.value));

		return this;
	}

	Field.prototype.getValue = function() {
		return this.value;
	}

	primitives.Field = Field;

	/*
	 * ------------- INPUT CLASS --------------
	 */
	function Input(context, name, template) {
		Field.call(this, context, name, template);

		this.element.on({
			input : function(event) {
				this.value = this.formatter(this.element.val());
				this.send('field:input', event);
			}.bind(this),
			change : function(event) {
				event.stopPropagation();
				this.fire();
			}.bind(this)
		});

		this.ondropfocus(this.setSelectionRange.bind(this));
	}
	Input.prototype = Object.create(Field.prototype);
	Input.prototype.constructor = Input;

	Input.prototype._allowedTags = function() {
		return [ 'INPUT', 'TEXTAREA' ];
	}

	Input.prototype.on = function(control, eventType, data) {
		if ([ 'control:focusout' ].includes(eventType)) {
			this.element.val(this.formatter(this.value));
		}

		return Field.prototype.on.call(this, control, eventType, data);
	}

	Input.prototype.setSelectionRange = function(start, finish) {
		(this.element.attr('type') != 'date') ? this.element[0].setSelectionRange(start || 0, finish || this.element.val().length) : null;
	}

	Input.prototype.setInputMask = function(inputMaskBuilder) {
		inputMaskBuilder(this);
		return this;
	}

	Input.prototype.fire = function() {
		(typeof this.handler === 'function') ? this.handler(this) : this.send('control:changed');
	}

	Input.prototype.disable = function(flag) {
		this.element.prop('disabled', flag);
		return this;
	}

	Input.prototype.setValue = function(value) {
		this.value = (typeof this.calculator === 'function') ? this.calculator(value) : value;
		this.element.val(this.formatter(this.value));

		return this;
	}

	primitives.Input = Input;

	/*
	 * ------------- BUTTON CLASS --------------
	 */
	function Button(context, name, template) {
		Field.call(this, context, name, template);

		this.isEnabled = true;

		this.element.on({
			keydown : function(event) {
				if ([ 13 ].includes(event.which)) {
					event.preventDefault();
					this.isEnabled ? this.fire() : null;
				}
			}.bind(this),
			mousedown : function(event) {
				event.preventDefault();
				(((event.which || 1) === 1) && this.isEnabled) ? this.fire() : null;
			}.bind(this)
		});
	}
	Button.prototype = Object.create(Field.prototype);
	Button.prototype.constructor = Button;

	// TODO Переименовать в setView
	Button.prototype.setContent = function(content) {
		if ([ '<' ].includes(content.charAt(0))) {
			this.content = $(content).css({
				width : '100%',
				height : '100%'
			});
			this.element.html(this.content.clone());
		} else {
			this.content = content;
			this.element.html(this.content);
		}

		return this;
	}

	Button.prototype.getView = function() {
		return this.content;
	}

	Button.prototype.fire = function() {
		(typeof this.handler === 'function') ? this.handler(this) : this.send('control:changed');
	}

	Button.prototype.disable = function(flag) {
		this.isEnabled = !flag;

		if (this.tabindex != undefined) {
			this.element.attr({
				tabindex : flag ? 'none' : this.tabindex
			});
		} else {
			this.element.removeAttr("tabindex");
		}

		this.element.css({
			opacity : flag ? 0.5 : 1
		});

		return this;
	}

	Button.prototype.setValue = function(value) {
		this.value = (typeof this.calculator === 'function') ? this.calculator(value) : value;
		this.content ? null : this.element.html(this.formatter(this.value));

		return this;
	}

	primitives.Button = Button;

	/*
	 * ------------- BUTTON FILE CLASS --------------
	 */
	function ButtonFile(context, name, template) {
		Button.call(this, context, name, template);
	}
	ButtonFile.prototype = Object.create(Button.prototype);
	ButtonFile.prototype.constructor = ButtonFile;

	ButtonFile.prototype.fire = function() {
		$('<input type="file" />').on({
			change : function(event) {
				var files = event.target.files;
				(typeof this.handler === 'function') ? this.handler(this, files) : this.send('control:changed', files);
			}.bind(this)
		}).click();
	}

	primitives.ButtonFile = ButtonFile;

	/*
	 * ------------- BUTTON TOGGLE CLASS --------------
	 */
	function ButtonToggle(context, name, template) {
		Button.call(this, context, name, template);
	}
	ButtonToggle.prototype = Object.create(Button.prototype);
	ButtonToggle.prototype.constructor = ButtonToggle;

	ButtonToggle.prototype.toggle = function(flag) {
		this.state = !!flag;
		this.element.toggleClass('button-pressed', this.state);

		return this;
	}

	ButtonToggle.prototype.fire = function() {
		this.toggle(!this.state);
		Button.prototype.fire.call(this);
	}

	primitives.ButtonToggle = ButtonToggle;

	/*
	 * ------------- RADIO CLASS --------------
	 */
	function Radio(context, name) {
		Control.call(this, context, name);
		this.radios = this.element.find('[type="radio"]');
	}
	Radio.prototype = Object.create(Control.prototype);
	Radio.prototype.constructor = Radio;

	Radio.prototype.on = function(control, eventType, data) {
		if ([ 'control:leftright' ].includes(eventType)) {
			this.nextItem((data.which === 38) ? -1 : 1);
		}
	}

	Radio.prototype.getActiveElement = function() {
		return this.radios.filter(function(index, item) {
			return item.checked;
		})[0];
	}

	Radio.prototype.nextItem = function(backforth) {
		var itemId = this.radios.index(this.getActiveElement());
		var nextItem = (this.radios.length > 1) ? this.radios[(itemId < this.radios.length - 1) ? itemId + backforth : 0] : null;
		nextItem.checked = true;
	}

	Radio.prototype.setValue = function(value) {
		this.radios.filter(function(index, item) {
			return item.value === value;
		})[0].checked = true;

		return this;
	}

	Radio.prototype.getValue = function() {
		return this.getActiveElement().value;
	}

	primitives.Radio = Radio;

	return primitives;
});
