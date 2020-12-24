'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope', '$rootScope', '$location', 'ProductService',
		function ($scope, $rootScope, $location, ProductService) {
		$scope.currentUser = $rootScope.globals.currentUser;
    }]);