'use strict';

angular.module('serviceDeskApp')
    .controller('AssetReportCtrl', function ($scope, $http, $modal, $log, $filter, $location, $window, socket, Auth) {

        $scope.assestmanagement = [];
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.assestmanagements = [];

        //Export table data to excel file.
        $scope.exportData = function () {
            var blob = new Blob([document.getElementById('exportable').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "AssetReport.xls");
        };

        //Export table data to excel file.
        $scope.exportData = function () {
            var blob = new Blob([document.getElementById('exportable').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Report.xls");
        };

        $http.get('/api/category').success(function (categories) {
            categories.unshift({
                categoryName: 'All',
                _id: -1
            });
            $scope.categories = categories;
        });

        $http.get('/api/department').success(function (departments) {
            departments.unshift({
                departmentName: 'All',
                _id: -1
            });
            $scope.departments = departments;
        });

        anychart.onDocumentReady(function () {
            $http.get('/api/assestmanagement').success(function (assestmanagements) {
                $scope.assestmanagements = assestmanagements;
                var data = assestmanagements;

                // create the chart
                var chart = anychart.pie();
                // set the chart title
                chart.title("Assets by Category ");

                // add the data
                chart.data(data);
                // display the chart in the container

                chart.container('container1');

                chart.draw();

                chart.listen("pointClick", function (e) {
                    chart.title(e.point.get("x") + " " + e.point.getIndex());
                    var selectedData = data[e.point.getIndex()].x;
                    console.log('Data Selected :  ' + selectedData)

                });
            });
        });

        //search 
        $scope.searchAssestmanagements = function (category, departments) {
            console.log("clicked");
        if( angular.isDefined(category) || angular.isDefined(departments) ){
            
            // filter by category when department is undefined
            if(category  != "-1" && angular.isDefined(category) && angular.isUndefined(departments)){
             
                $http.get('/api/assestmanagement/' + category + '/categories').success(function(assestmanagements) {

                    $scope.assestmanagements = assestmanagements;
                });
                console.log('filter by only category');
            } else
            // filter by department when category is undefined
            if(departments != "-1" && angular.isDefined(departments) && angular.isUndefined(category) ){

                $http.get('/api/assestmanagement/' + departments + '/departments').success(function(assestmanagements) {

                    $scope.assestmanagements = assestmanagements;
                });
                console.log('filter by only department');
            } else
            // filter by both category and department
            if(departments != "-1" && angular.isDefined(departments) && category != "-1" && angular.isDefined(category)) {

                $http.get('/api/assestmanagement/'+ category + '/' + departments).success(function(assestmanagements) {

                    $scope.assestmanagements = assestmanagements;
                });
                console.log('filter by both category and department');
            }
        }
             
        
     
    }// end of asset filter button

       


        $http.get('/api/assestmanagement').success(function (assestmanagements) {
            $scope.assestmanagements = assestmanagements;
            socket.syncUpdates('assestmanagement', $scope.assestmanagements, function (event, assestmanagement, assestmanagements) {
            });
        });

        $http.get('/api/category').success(function (categories) {
            $scope.categories = categories;
            socket.syncUpdates('category',
                $scope.categories, function (event, category, categories) {
                });
        });

        $http.get('/api/department').success(function (departments) {
            $scope.departments = departments;
            socket.syncUpdates('department',
                $scope.departments, function (event, department, departments) {
                });
        });

        $scope.open = function (assestmanagement) {

            var modalInstance = $modal.open({
                templateUrl: 'app/assestmanagement/partials/assestmanagement-details.modal.html',
                controller: 'assestmanagementModalInstanceCtrl',
                resolve: {
                    assestmanagements: function () {
                        return assestmanagement;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.cancel = function () {
            $window.history.back();
        };

        $scope.delete = function (issuechannel) {
            $http.delete('/api/assestmanagement/' + assestmanagement._id);

        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('assestmanagement');
        });
    });
