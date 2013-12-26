define(['app'], function(app) {
    'use strict';
    app.directive('camera', function() {
        return function($scope, element) {
            element.bind('click', function() {
                navigator.camera.getPicture(function(){
                    //success
                },function(){
                    //failed
                });
            });
        };
    });
});
