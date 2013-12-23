define(['underscore'], function() {
	return ['$scope', '$http', function($scope, $http) {
		// You can access the scope of the controller from here
        $scope.documents = [];
        $scope.editingDocId;
        $scope.list = function(){
            $scope.documents = [];
            $scope.editingDocId = null;
            $http({
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: 'http://localhost/rs1/visavis_valued_year_201309231300_fad04cabcr/api/search/ext/advancedresult?tid=0&who=admin&api_key=3d4875648f934d3b99cf18cb582a50eb&pi=0&ps=10',
                data: "enablekeywordsynonyms=false&enabletagsynonyms=false&containchildfolder=false&containchildcategory=false&docclass=5&sort=_l_last_modified_datetime"
            }).success(function(data){
                var docs = data.data[0];
                $scope.documents = _.map(docs, function(doc){
                    return {
                        title: doc.Title,
                        newTitle: doc.Title,
                        id: doc.UniqueKey
                    };
                });
            });
        };
        $scope.update = function(doc){
            $http({
                method: 'GET',
                url: 'http://localhost/rs1/visavis_valued_year_201309231300_fad04cabcr/api/document/'+doc.id+'?tid=0&who=admin&api_key=3d4875648f934d3b99cf18cb582a50eb'
            }).success(function(data){
                var tempDocAttr = data.data.DocumentAttributes;
                _.findWhere(tempDocAttr, {Name:'name'}).Value = doc.newTitle;
                $http({
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'http://localhost/rs1/visavis_valued_year_201309231300_fad04cabcr/api/document/attributes/update/'+doc.id+'?tid=0&who=admin&api_key=3d4875648f934d3b99cf18cb582a50eb',
                    data: 'attributeinfo='+JSON.stringify(tempDocAttr)
                }).success(function(){
                    $scope.list();
                });
            });
        };
        $scope.create = function(doc){
            $http({
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: 'http://localhost/rs1/visavis_valued_year_201309231300_fad04cabcr/api/document/acquirenewdocumentdraft?tid=0&who=admin&api_key=3d4875648f934d3b99cf18cb582a50eb',
                data: "folder_id=3&document_class_id=5"
            }).success(function(data){
                var draft = data.data;
                draft.DeactivationDatetime = "/Date(253402271999000)/";
                _.findWhere(draft.DocumentAttributes, {Name:'name'}).Value = doc.title;
                $http({
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'http://localhost/rs1/visavis_valued_year_201309231300_fad04cabcr/api/document/new?tid=0&who=admin&api_key=3d4875648f934d3b99cf18cb582a50eb',
                    data: "folder_id=3&documentdetailinfo="+JSON.stringify(draft)
                }).success(function(){
                    $scope.list();
                });
            });
        };
        $scope['delete'] = function(id){
            $http({
                method: 'DELETE',
                url: 'http://localhost/rs1/visavis_valued_year_201309231300_fad04cabcr/api/document/delete/'+id+'?tid=0&who=admin&api_key=3d4875648f934d3b99cf18cb582a50eb'
            }).success(function(){
                $scope.list();
            })
        };

        $scope.enableEditMode = function(doc){
            $scope.editingDocId = doc.id;
        };
        $scope.disableEditMode = function(doc){
            $scope.editingDocId = $scope.editingDocId == doc.id ? null : doc.id;
        };
		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
        $scope.list();
	}];
});