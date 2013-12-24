define(['underscore'], function() {
	return ['$scope', '$http', 'todoService', function($scope, $http, todoService) {
		// You can access the scope of the controller from here
        $scope.todos = [];
        $scope.list = function(){
            todoService.list().success(function(result){
                $scope.todos = _.map(result.reverse(), function(todo){
                    todo.newTitle = todo.title;
                    return todo;
                });
                $scope.todos = _.sortBy($scope.todos, 'completed');
            });
        };
        $scope.update = function(todo){
            todo.title = todo.newTitle;
            todoService.update(todo.id, todo).success(function(){
                $scope.list();
            });
        };
        $scope.setCompleted = function(todo){
            todo.completed = true;
            todoService.update(todo.id, todo).success(function(){
                $scope.list();
            });
        };
        $scope.add = function(todo){
            todoService.add(todo).success(function(){
                $scope.list();
                todo.title='';
            });
        };
        $scope['delete'] = function(id){
            todoService['delete'](id).success(function(){
                $scope.list();
            })
        };
		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
        $scope.list();
	}];
});