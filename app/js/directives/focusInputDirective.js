define(['app'], function(app) {
    'use strict';
    app.directive('focusInput', function() {
        return function($scope, element) {
            element.bind('click', function() {
                element.find('input')[0].focus();
            });
        };
    });
});
