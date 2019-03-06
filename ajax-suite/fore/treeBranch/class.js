define([ 'core/TreeBranch', 'core/primitives', 'icons/@dir' ], function(Class, primitives, icons) {
	"use strict";

	/*
	 * ------------- UTILITIES --------------
	 */
	function expcolIcon(state) {
		var expcolIcon = null;

		if (![ 'none' ].includes(state)) {
			expcolIcon = $([ 'expanded' ].includes(state) ? icons.collapse : icons.expand).css({
				'width' : '100%',
				'height' : '100%'
			});
		}

		return expcolIcon;
	};

	/*
	 * ------------- GENEGIC TREE BRANCH CLASS --------------
	 */
	function TreeBranch(context, name, template, container, entryBuilder) {
		Class.call(this, context, name, template, container, entryBuilder);

		this.btnExpCol = new primitives.Button(this, '*/expcol').setHandler(function(self) {
			this.setState([ 'expanded' ].includes(this.state) ? 'collapsed' : 'expanded');
		}.bind(this));
	}
	TreeBranch.prototype = Object.create(Class.prototype);
	TreeBranch.prototype.constructor = TreeBranch;

	TreeBranch.prototype.setState = function(state) {
		Class.prototype.setState.call(this, state);
		this.btnExpCol.setValue(expcolIcon(this.state));
	}

	return TreeBranch;
});