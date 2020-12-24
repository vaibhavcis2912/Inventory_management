'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Products', []);

angular.module('InventoryManagement', [
    'Authentication',
	'Home',
	'Products',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/app/templates/login.html'
        })
		
		.when('/products', {
            controller: 'ProductController',
            templateUrl: 'modules/products/app/templates/productOverview.html'
		})

		.when('/product/:productId', {
            controller: 'ProductController',
            templateUrl: 'modules/products/app/templates/product.html'
		})

		.when('/addProduct', {
            controller: 'ProductController',
            templateUrl: 'modules/products/app/templates/createAndEditProduct.html'
		})

		.when('/editProduct/:productId', {
            controller: 'ProductController',
            templateUrl: 'modules/products/app/templates/createAndEditProduct.html'
		})
		
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/app/templates/home.html'
        })

        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
			if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);