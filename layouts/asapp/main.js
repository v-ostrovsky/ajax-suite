define([ '../lib/as.min' ], function() {
	"use strict";

	var appRequire = require.config({
		urlArgs : 'bust=v2.2.0'
	});

	appRequire([ 'as', 'i18n!application/config/nls/root', 'application/config/icons/@dir', 'application/shared/uio/@dir', 'application/body/builder' ], function(as, locale, icons, uio, bodyBuilder) {
		Object.assign(as.icons, icons);
		Object.assign(as.locale, locale);
		as.uio = uio;

		require([ 'css!application/config/css/style' ], function() {
			console.log('application', bodyBuilder());
		});
	});
});