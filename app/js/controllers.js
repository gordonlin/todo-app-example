define(['angular', 'services'], function (angular) {
	'use strict';
	/* Controllers */
	return angular.module('demoApp.controllers', ['demoApp.services'])
		// More involved example where controller is required from an external file
		.controller('todoController', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/todoController'], function(todoController) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(todoController, this, {'$scope': $scope});
			});
		}]);
});