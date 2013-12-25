define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/list', {
			templateUrl: 'app/partials/list.html'
		});
		$routeProvider.otherwise({redirectTo: '/list'});
	}]);

});