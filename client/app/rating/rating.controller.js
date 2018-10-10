'use strict';

angular.module('serviceDeskApp')
    .controller('RatingCtrl', function ($scope, Auth, $location, $routeParams) {
        $scope.errors = {};
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.ratingToken = $routeParams.confirmToken;
        var ratingMailSend = false;
        $scope.invalidToken = false;


        if ($scope.ratingToken) {
            Auth.createUser($scope.ratingToken)
                .then( function() {
                    // Logged in, redirect to home
                    $location.path('/');
                })
                .catch( function() {
                    $scope.invalidToken = true;
                });
        }


        $scope.sendRatingMail = function() {

            Auth.sendRatingMail();
        };

        $scope.ratingMailSend = function() {
            return ratingMailSend;
        };


    });
