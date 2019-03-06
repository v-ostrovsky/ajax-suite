define([ './Control', './primitives', './Backdrop', './DropdownInput' ], function(Control, primitives, Backdrop, DropdownInput) {
	"use strict";

	var Field = primitives.Field, Button = primitives.Button;

	/*
	 * ------------- SELECT INTERFACE --------------
	 */
	function Select(context, name, template) {
		Control.call(this, context, name, template);
	}
	Select.prototype = Object.create(Control.prototype);
	Select.prototype.constructor = Select;

	Select.prototype.setContent = function(data) {
		return this;
	}

	Select.prototype.getItem = function(value) {
		return null;
	}

	Select.prototype.setValue = function(value) {
		return this;
	}

	Select.prototype.getValue = function() {
		return null;
	}

	/*
	 * ------------- DROPDOWN CLASS --------------
	 */
	function Dropdown(context, name, displayBuilder) {
		Field.call(this, context, name);

		this.element.css({
			'position' : 'relative'
		});

		var buttonWidth = '20px';

		/* ------------ display ------------ */
		this.display = (typeof displayBuilder === 'function') ? displayBuilder(this) : new DropdownInput(this, '', 'create:<input>');

		this.display.element.attr({
			'name' : 'display',
			'tabindex' : 0
		}).css({
			'position' : 'absolute',
			'top' : 0,
			'left' : 0,
			'box-sizing' : 'border-box',
			'height' : '100%',
			'width' : '100%',
			'border' : 'inherit',
			'border-color' : 'rgb(255, 255, 255, 0)',
			'padding' : 'inherit'
		}).css({
			'padding-right' : buttonWidth
		});

		this.display.element.on({
			keydown : function(event) {
				if ([ 13 ].includes(event.which)) {
					event.stopPropagation();
					this.select.isVisible() ? null : this._show_();
				}
			}.bind(this)
		});

		/* ------------ buttons ------------ */
		var btnCss = {
			'background-color' : 'transparent',
			'position' : 'absolute',
			'top' : 0,
			'box-sizing' : 'border-box',
			'height' : '100%',
			'text-align' : 'center',
			'line-height' : this.element.css('height'),
			'color' : 'initial'
		};

		// TODO Переделать всюду предварительное создание элемента в передачу шаблона (атрибут name обязателен)
		this.btn = new Button(this, '', 'create:<div name="btn"></div>').setContent('&#x25BC');
		this.btn.element.css(Object.assign({}, btnCss, {
			'right' : 0,
			'width' : buttonWidth,
			'font-size' : '10px'
		}));

		this.clear = new Button(this, '', 'create:<div name="clear"></div>').setHandler(function(self) {
			self.send('item:selected');
		}).setContent('&#x25BC').setVisibility(false);
		this.clear.element.css(Object.assign({}, btnCss, {
			'right' : buttonWidth,
			'width' : 0.5 * buttonWidth,
			'font-size' : '8px'
		}));
	}
	Dropdown.prototype = Object.create(Field.prototype);
	Dropdown.prototype.constructor = Dropdown;

	Dropdown.prototype._show_ = function() {
		this.backdrop = new Backdrop(this, function(initiator, event) {
			initiator._hide_();
		}).setZIndex(999);
		this.select.setVisibility(true);
		return this;
	}

	Dropdown.prototype._hide_ = function() {
		this.backdrop.destroy();
		delete this.backdrop;
		this.select.setVisibility(false);
		return this;
	}

	Dropdown.prototype.on = function(control, eventType, data) {
		if ([ 'control:focusin' ].includes(eventType) && (control === this.display)) {
			this.send(eventType, data);
			return false;
		}
		if ([ 'control:tabulate' ].includes(eventType) && (control === this.display)) {
			this.send(eventType, data);
			return false;
		}
		if ([ 'control:changed' ].includes(eventType) && (control === this.btn)) {
			if (this.select.isVisible()) {
				this.select.focus(this.select.getItem(this.display.getValue()));
				this._hide_().send('control:escape', data);
			} else {
				this._show_();
			}
			return false;
		}
		if ([ 'control:setVisibility' ].includes(eventType) && (control === this.select)) {
			this.focus(data ? this.select : this.display);
			return false;
		}
		if ([ 'item:selected' ].includes(eventType) && (control === this.select)) {
			this.display.setValue(this.select.getItem().getView());
			this._hide_().fire(data);
			return false;
		}
		if ([ 'control:tabulate', 'control:escape' ].includes(eventType) && (control === this.select)) {
			this.select.focus(this.select.getItem(this.display.getValue()));
			this._hide_().send(eventType, data);
			return false;
		}

		return Field.prototype.on.call(this, control, eventType, data);
	}

	Dropdown.prototype.setSelect = function(selectBuilder) {
		if (typeof selectBuilder != 'function') {
			selectBuilder = function(context) {
				return new Select(context, '', 'create:<div></div>');
			};
		}

		if (this.select != undefined) {
			this.select.element.remove();
		}

		this.select = selectBuilder(this).setVisibility(false);

		this.select.element.attr({
			'name' : 'select'
		}).css({
			'background-color' : 'white',
			'position' : 'absolute',
			'top' : this.element.css('height'),
			'left' : 'calc(0px - ' + this.element.css('border-left-width') + ')',
			'box-sizing' : 'border-box',
			'min-width' : 'calc(100% + ' + this.element.css('border-left-width') + ' + ' + this.element.css('border-right-width') + ')',
			'max-height' : '200px',
			'height' : 'auto',
			'border' : '1px solid #aaa'
		});

		return this;
	}

	Dropdown.prototype.getDefaultActiveElement = function() {
		return this.display;
	}

	Dropdown.prototype.setCalculator = function(calculator) {
		this.display.calculator = calculator;
		return this;
	}

	Dropdown.prototype.setTooltip = function(text) {
		return this._setTooltip_(this.display.element, text);
	}

	Dropdown.prototype.fire = function(data) {
		(typeof this.handler === 'function') ? this.handler(this, data) : this.send('control:changed');
	}

	Dropdown.prototype.isValid = function() {
		return this.validator(this);
	}

	Dropdown.prototype.setContent = function(data) {
		this.select.setContent(data);
		return this;
	}

	Dropdown.prototype.getContent = function() {
		return this.select;
	}

	Dropdown.prototype.setValue = function(value) {
		this.select.setValue(value);
		this.display.setValue(this.select.getItem() ? this.select.getItem().getView() : null);

		return this;
	}

	Dropdown.prototype.getValue = function() {
		return this.select.getValue();
	}

	return Dropdown;
});