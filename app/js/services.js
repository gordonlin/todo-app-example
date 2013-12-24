define(['angular'], function (angular) {
	'use strict';
    var baseUri = 'http://localhost/todo_backend/api/';
    /* Services */
    angular.module('demoApp.services', []).factory('todoService', function($http){
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
