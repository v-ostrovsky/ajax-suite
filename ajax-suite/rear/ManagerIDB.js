define([ './rear' ], function(rear) {
	"use strict";

	/*
	 * ------------- MANAGER INDEXEDDB CLASS --------------
	 */
	function ManagerIDB(parameters) {
		rear.Suspended.call(this, parameters);
	}
	ManagerIDB.prototype = Object.create(rear.Suspended.prototype);
	ManagerIDB.prototype.constructor = ManagerIDB;

	ManagerIDB.prototype._createDatabase_ = function() {
		var request = window.indexedDB.open(this.parameters.dbName, this.parameters.version), isUpgraded = false;

		request.onupgradeneeded = function(event) {
			this.parameters.tables.forEach(function(item) {
				var store = request.result.createObjectStore(item.name, {
					keyPath : item.keyPath || 'id',
					autoIncrement : item.autoIncrement || true
				});

				(item.indexes || []).forEach(function(index) {
					store.createIndex(index.indexName, index.indexName, {
						unique : index.unique
					});
				});

				(item.data || []).forEach(function(item) {
					store.add(item);
				});
			});
			isUpgraded = true;
		}.bind(this);

		request.onsuccess = function(event) {
			request.result.close();

			if (isUpgraded) {
				this._oncomplete('success', {
					code : 'isUpgraded'
				});
			} else {
				this._oncomplete('error', {
					code : 'notUpgraded'
				});
			}
		}.bind(this);

		request.onerror = function(event) {
			request.result.close();
			this._oncomplete('error', event.target.error);
		}.bind(this);
	}

	ManagerIDB.prototype._deleteDatabase_ = function() {
		var request = window.indexedDB.deleteDatabase(this.parameters.dbName);

		request.onsuccess = function(event) {
			this._oncomplete('success', {
				code : 'isDeleted'
			});
		}.bind(this);

		request.onerror = function(event) {
			this._oncomplete('error', event.target.error);
		}.bind(this);
	}

	ManagerIDB.prototype._sendRequest = function() {
		this['_' + this._requestParams.type + '_']();
	}

	ManagerIDB.prototype.execute = function(onsuccess, onfailure) {
		function callback(response) {
			return (this.status === 'success') ? onsuccess.call(this, response) : onfailure.call(this, this.status, response);
		};

		return rear.Suspended.prototype.execute.call(this, callback);
	}

	return ManagerIDB;
});