'use strict';

angular.module('serviceDeskApp')
.controller('AddEvaluationCtrl', function ($scope, $http, $window, $location) {


    $http.get('/api/issue-status').success(function (issuestatuses) {
        issuestatuses.unshift({
        issueStatusName: 'All',
            _id: -1
        });
        $scope.issuestatuses = issuestatuses;
    });


    $scope.evaluation = {};

    $scope.addEvaluation = function(evaluation,isValid) {
        $scope.submitted = true;
        console.log(evaluation);
        if(isValid && $scope.submitted) {
            $http.post('/api/evaluation-outcome',evaluation);
            $scope.evaluation = {};
            $location.path('/evaluation');
        }
    };

    $scope.cancel = function() {
        $window.history.back();
    };
});
