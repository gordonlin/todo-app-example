define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	], function (angular, filters, services, directives, controllers) {
		'use strict';

		// Declare app level module which depends on filters, and services
		
		return angular.module('demoApp', [
			'ngRoute',
			'demoApp.controllers',
			'demoApp.filters',
			'demoApp.services',
			'demoApp.directives',
			'ui.bootstrap'
		]);
});
