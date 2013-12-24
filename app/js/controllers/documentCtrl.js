define(['underscore'], function() {
	return ['$scope', '$http', 'documentService', function($scope, $http, documentService) {
		// You can access the scope of the controller from here
        $scope.documents = [];
        $scope.list = function(){
            documentService.list().success(function(data){
                var docs = data.data[0];
                $scope.documents = _.map(docs, function(doc){
                    return {
                        title: doc.Title,
                        status: true,
                        newTitle: doc.Title,
                        id: doc.UniqueKey
                    };
                });
            });
        };
        $scope.update = function(doc){
            documentService.get(doc.id).success(function(data){
                var tempDocAttr = data.data.DocumentAttributes;
                _.findWhere(tempDocAttr, {Name:'name'}).Value = doc.newTitle;
                documentService.updateAttributes(doc.id, tempDocAttr).success(function(){
                    $scope.list();
                });
            });
        };
        $scope.create = function(doc){
            documentService.getDraft().success(function(data){
                var draft = data.data;
                draft.DeactivationDatetime = "/Date(253402271999000)/";
                _.findWhere(draft.DocumentAttributes, {Name:'name'}).Value = doc.title;
                documentService.create(draft).success(function(){
                    $scope.list();
                    doc.title='';
                });
            });
        };
        $scope['delete'] = function(id){
            documentService['delete'](id).success(function(){
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