require.config({
	paths: {
		angular: '../libs/angular/angular',
		angularRoute: '../libs/angular-route/angular-route',
		text: '../libs/requirejs-text/text',
		underscore: '../libs/underscore-amd/underscore-min',
		bootstrap: '../libs/angular-bootstrap/ui-bootstrap-tpls.min'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		bootstrap: ['angular']
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes',
	'bootstrap'
], function(angular, app, routes) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
