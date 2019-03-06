define([ 'rear/ManagerIDB' ], function(Class) {
	"use strict";

	/*
	 * ------------- MANAGER INDEXEDDB CLASS --------------
	 */
	function ManagerIDB(parameters) {
		Class.call(this, parameters);
	}
	ManagerIDB.prototype = Object.create(Class.prototype);
	ManagerIDB.prototype.constructor = ManagerIDB;

	ManagerIDB.prototype.createDatabase = function() {
		var requestParams = {
			type : 'createDatabase'
		};

		return this.fetch(requestParams);
	}

	ManagerIDB.prototype.deleteDatabase = function() {
		var requestParams = {
			type : 'deleteDatabase'
		};

		return this.fetch(requestParams);
	}

	return ManagerIDB;
});