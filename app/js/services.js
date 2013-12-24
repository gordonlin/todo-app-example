define(['angular'], function (angular) {
	'use strict';
    /* Services */
    var baseUri = 'http://localhost/rs1/visavis_valued_year_201309231300_fad04cabcr/api/{0}?tid=0&who=admin&api_key=3d4875648f934d3b99cf18cb582a50eb&pi=0&ps=30';
    // Demonstrate how to register services
    // In this case it is a simple value service.
    angular.module('myApp.services', []).factory('documentService', function($http){
        return {
            list: function(status){
                return $http({
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: baseUri.format('search/ext/advancedresult'),
                    data: "enablekeywordsynonyms=false&enabletagsynonyms=false&containchildfolder=false&containchildcategory=false&docclass=5&sort=_l_last_modified_datetime"
                });
            },
            getDraft: function(){
                return $http({
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: baseUri.format('document/acquirenewdocumentdraft'),
                    data: "folder_id=3&document_class_id=5"
                });
            },
            create: function(docDetailInfo){
                return $http({
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: baseUri.format('document/new'),
                    data: "folder_id=3&documentdetailinfo="+JSON.stringify(docDetailInfo)
                });
            },
            updateAttributes: function(id, attributes){
                return $http({
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: baseUri.format('document/attributes/update/'+id),
                    data: 'attributeinfo='+JSON.stringify(attributes)
                });
            },
            get: function(id){
                return $http({
                    method: 'GET',
                    url: baseUri.format('document/'+id)
                });
            },
            delete: function(id){
                return $http({
                    method: 'DELETE',
                    url: baseUri.format('document/delete/'+id)
                });
            }
        };
    });
});
