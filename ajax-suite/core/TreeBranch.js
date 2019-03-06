define([ './Control' ], function(Control) {
	"use strict";

	/*
	 * ------------- TREE BRANCH CLASS --------------
	 */
	function TreeBranch(context, name, template, container, entryBuilder, branchBuilder) {
		Control.call(this, context, name, 'create:' + template);

		this.collectionName = name;
		this.template = template;
		this.container = this.element.find('[name="' + container + '"]');
		this.entryBuilder = entryBuilder || this.context.entryBuilder;
		this.branchBuilder = branchBuilder || function(context) {
			return new this.constructor(context, this.collectionName, this.template, this.container.attr('name'), this.entryBuilder);
		}.bind(this);
	}
	TreeBranch.prototype = Object.create(Control.prototype);
	TreeBranch.prototype.constructor = TreeBranch;

	TreeBranch.prototype.setAsInvisible = function(flag) {
		this.isInvisible = flag;
		this.setVisibility(!flag);

		return this;
	}

	TreeBranch.prototype.setState = function(state) {
		if (this.collection.length) {
			this.state = state || 'collapsed';

			if (this.state === 'collapsed' && this.element.has(document.activeElement).length) {
				this.entry.focus();
			}

			for ( var key in this.collection) {
				this.collection[key].setVisibility((this.state === 'expanded') && !this.collection[key].isInvisible);
			}
		} else {
			this.state = 'none';
		}
	};

	TreeBranch.prototype.addBranch = function(data, index) {
		return this.branchBuilder(this).buildContent(data.node, data.collection, index, data.state);
	}

	TreeBranch.prototype.buildContent = function(attributes, collection, itemId, state) {
		var root = (this.context instanceof TreeBranch) ? this.context.entry.root : this;
		this.entry = this.entryBuilder(this, attributes).setItemId(root, itemId);
		this.entry.parent = (this.context instanceof TreeBranch) ? this.context.entry : null;

		this.collection = [];
		collection.forEach(function(item, index) {
			this.collection[index] = this.addBranch(item, index);
		}.bind(this));

		this.setState(state);

		return this;
	}

	TreeBranch.prototype.forEach = function(handler) {
		function forEachSubEntry(branch) {
			for ( var key in branch.collection) {
				var result = handler(branch.collection[key].entry) || forEachSubEntry(branch.collection[key]);
				if (result) {
					return result;
				}
			}
		}

		return this.entry ? (handler(this.entry) || forEachSubEntry(this)) : null;
	}

	TreeBranch.prototype.getEntry = function(code) {
		function findChild(branch, code) {
			if (code === branch.entry.attributes.code) {
				return branch;
			} else {
				var found = branch.collection.find(function(item) {
					return (code.search(item.entry.attributes.code) === 0)
				});

				return (found) ? findChild(found, code) : null;
			}
		}

		return findChild(this, code).entry;
	}

	TreeBranch.prototype.getEntryById = function(id) {
		return this.forEach(function(entry) {
			if (parseInt(entry.getValue()) === id) {
				return entry;
			}
		});
	}

	TreeBranch.prototype.forEachUp = function(handler) {
		function forEachContext(branch) {
			if (branch.context && branch.context instanceof TreeBranch) {
				return handler(branch.context.entry) || forEachContext(branch.context);
			}
		}

		return forEachContext(this);
	}

	TreeBranch.prototype.expandDown = function() {
		this.forEach(function(entry) {
			entry.context.setState('expanded');
		});
		return this;
	}

	TreeBranch.prototype.collapseDown = function() {
		this.forEach(function(entry) {
			entry.context.setState('collapsed');
		});
		return this;
	}

	TreeBranch.prototype.expandUp = function() {
		this.forEachUp(function(entry) {
			entry.context.setState('expanded');
		});
		return this;
	}

	TreeBranch.prototype.collapseUp = function() {
		this.forEachUp(function(entry) {
			entry.contex.setState('collapsed');
		});
		return this;
	}

	TreeBranch.prototype.applyMask = function(ids) {
		this.forEach(function(entry) {
			entry.context.setAsInvisible(true);
		});

		ids.forEach(function(item) {
			var entry = this.getEntryById(item);
			entry.context.setAsInvisible(false);

			entry.context.forEachUp(function(entryItem) {
				entryItem.context.setAsInvisible(false);
			});
		}.bind(this));

		return this;
	}

	TreeBranch.prototype.mixStates = function(branch, states) {
		branch.state = states[branch.node.id] || 'collapsed';
		branch.collection.forEach(function(item) {
			TreeBranch.prototype.mixStates(item, states)
		});
	}

	TreeBranch.prototype.refresh = function(data) {
		var itemId = this.entry.itemId;

		var states = {};
		this.forEach(function(item) {
			states[item.getValue()] = item.context.state;
		});
		this.mixStates(data, states);

		this.entry.element.remove();
		delete this.entry;
		this.collection.forEach(function(item) {
			item.element.remove();
		});
		this.collection = [];

		return this.buildContent(data.node, data.collection, itemId, data.state);
	}

	return TreeBranch;
});