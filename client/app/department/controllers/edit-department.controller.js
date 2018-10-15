'use strict';

angular.module('serviceDeskApp')
.controller('EditDepartmentCtrl', function ($scope, $http, $location, $window, $routeParams) {

    $scope.department = {};
    $scope.submitted = false;
    $scope.department_id = $routeParams.id;

    $http.get('/api/department/' + $scope.department_id ).success(function(department) {
        $scope.department = department;
    })
    
    $http.get('/api/user').success(function(users) {
        $scope.users = users;
    })

    $scope.editDepartment = function(department,isValid) {
        $scope.submitted = true;
        $scope.department = department_id;
        if(isValid && $scope.submitted) {
            $http.post('/api/department/' + $scope.department_id,department);
            $scope.department = department;
            $location.path('/api/department');
        }
    };

    $scope.cancel = function() {
        $window.history.back();
    };
});
