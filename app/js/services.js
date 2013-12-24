define(['angular','text!../../config.json'], function (angular,config) {
	'use strict';

    /* Services */
    angular.module('demoApp.services', []).factory('todoService', function($http){
        var baseUri = JSON.parse(config).baseUri;
        return {
            list: function(status){
                return $http({
                    method: 'GET',
                    url: baseUri + 'todos'
                });
            },
            add: function(todo){
                return $http({
                    method: 'POST',
                    url: baseUri + 'todos',
                    data: todo
                });
            },
            update: function(id, todo){
                return $http({
                    method: 'PUT',
                    url: baseUri + 'todos/'+id,
                    data: todo
                });
            },
            delete: function(id){
                return $http({
                    method: 'DELETE',
                    url: baseUri + 'todos/'+id
                });
            }
        };
    });
});
