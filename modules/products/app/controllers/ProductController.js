'use strict';

angular.module('Products')

	.controller('ProductController',
		['$scope', '$routeParams', '$location', 'ProductService',
			function ($scope, $routeParams, $location, ProductService) {
				$scope.productId = null;
				$scope.selectedProducts = [];
				$scope.products = [];
				$scope.productData = {};
				//get the product id prom url
				if (typeof $routeParams.productId !== 'undefined') {
					$scope.productId = $routeParams.productId;
				}

				//function for load all the products
				$scope.loadProducts = function () {
					if ($scope.productId) {
						ProductService.getProductById($scope.productId).then(function (response) {
									if(response){
										$scope.productData = response;
										$scope.$apply();
									}
						})
					}
					else {
						ProductService.loadProducts().then(function (response) {
							if (response.success) {
								$scope.products = response.data;
								$scope.$apply();
							}
						});
					}



				};
				$scope.loadProducts();

				$scope.saveData = function () {
					ProductService.saveData($scope.productData).then(function (response) {
						if (response.success) {
							$location.path('/products');
							$scope.$apply();
						}
					});
				};

				$scope.deleteProdcutData = function (id) {
					if (confirm("Are you sure you want to remove it?")) {
						ProductService.deleteProdcutData(id).then(function (response) {
							if(response){
								$scope.loadProducts()
							}
						});
					}
				};

				//function will call on the checkbox selection
				$scope.selectProduct = function (product, active) {
					if (active) {
						$scope.selectedProducts.push({_id : product._id, _rev: product._rev, _deleted : true })
					}
					else {
						$scope.selectedProducts.splice($scope.selectedProducts.indexOf(x => x._id == product._id), 1);
					}
				};

				//for multiple delete
				$scope.deleteSelectedProducts = function () {
					if ($scope.selectedProducts.length > 0 && confirm("Are you sure you want to remove selected products?")) {						
						ProductService.deleteMultipleProdcuts($scope.selectedProducts).then(function (response) {
							if(response){
								$scope.selectedProducts = [];
								$scope.loadProducts(
									
								)
							}
						});
					}
					else{
						alert("No product select!")
					}
				};
			}]);