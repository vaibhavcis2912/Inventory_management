'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$timeout',
    function ($scope, $rootScope, $location, AuthenticationService, $timeout) {
        // var db = new PouchDB('inventory_user_data');
        // // db.destroy().then(function (response) {
        // //   // success
        // //   console.log("succeess")
        // // }).catch(function (err) {
        // //   console.log(err);
        // // });
       
        AuthenticationService.createDefaluUser();
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                    alert("Invalid username or password!")
                }
                $scope.$evalAsync();

                // $timeout(function() { //used timeout here to fix the "already a $digest cycle running" problem
                //   $scope.$apply();
                // });

            });
        };
    }]);