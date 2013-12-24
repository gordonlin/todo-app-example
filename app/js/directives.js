define(['angular', 'services'], function(angular, services) {
	'use strict';

  /* Directives */
	angular.module('demoApp.directives', ['demoApp.services'])
		.directive('focusInput', function(){
            return function($scope, element){
                element.bind('click', function(){
                    element.find('input')[0].focus();
                });
            };
        });
});
