define(['angular', 'services'], function(angular, services) {
	'use strict';

  /* Directives */

	angular.module('myApp.directives', ['myApp.services'])
		.directive('focusInput', function(){
            return function($scope, element){
                element.bind('click', function(){
                    element.find('input')[0].focus();
                });
            };
        });
});
