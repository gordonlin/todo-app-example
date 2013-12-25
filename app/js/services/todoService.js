define(['app', 'text!../../../config.json'], function(app, config) {
    'use strict';
    /* Services */
    app.factory('todoService', ['$http', function($http) {
            var isApp = location.protocol === 'file:' && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
            var baseUri = isApp ? JSON.parse(config).baseUriMobileDevice : JSON.parse(config).baseUriDesktop;
            return {
                list: function(status) {
                    return $http({
                        method: 'GET',
                        url: baseUri + 'todos'
                    });
                },
                add: function(todo) {
                    return $http({
                        method: 'POST',
                        url: baseUri + 'todos',
                        data: todo
                    });
                },
                update: function(id, todo) {
                    return $http({
                        method: 'PUT',
                        url: baseUri + 'todos/' + id,
                        data: todo
                    });
                },
                delete: function(id) {
                    return $http({
                        method: 'DELETE',
                        url: baseUri + 'todos/' + id
                    });
                }
            };
        }
    ]);
});
