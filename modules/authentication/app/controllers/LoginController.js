'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$timeout',
    function ($scope, $rootScope, $location, AuthenticationService, $timeout) {
        var db = new PouchDB('inventory_user_data');
        var user = {
            _id: "user:"+new Date().toISOString(),
            username: "admin",
            password: "Cisin123456"
          };
          db.find({
            selector: {
              _id: {
                          $gt: "user:",
                          $lt: "user:\uffff"
                      },
              username: "admin",
              password: "Cisin123456"
            }
          }, function (err, doc) {
            if (!err && doc.docs.length == 0) {
              db.put(user, function callback(err1, result) {
                if (!err1) {
                  // console.log('Default User Created!');
                }
                
              });
            }
          })
        // reset login status
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
                }
                $timeout(function() { //used timeout here to fix the "already a $digest cycle running" problem
					$scope.$apply();
				});

            });
        };
    }]);