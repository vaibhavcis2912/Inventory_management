'use strict';

angular.module('Products')

.factory('ProductService',
	['$http','PouchDBService',
		function ($http, PouchDBService) {
			var db = new PouchDB('inventory_user_data');
			var service = {
				loadProducts: async function (callback) {
					PouchDBService.getData({
						_id: {
							$gt: "product:",
							$lt: "product:\uffff"
						},
					}).then(function (data) {
						callback({ success: true ,data : data.docs})
					}, function (err) {
						callback({ success: false, err: err })
					})
				},

				getProductById: function (id, callback) {
					//here will get the product data from DB based on id and return;
					PouchDBService.getDocumentById(id
					).then(function (data) {
						callback({ success: true ,data : data})
					}, function (err) {
						callback({ success: false, err: err })
					})
				},
				
				saveData: function (productData, callback) {
					//here will send the data to save and edit
					//if productData contain productId then send edit otherwise add 
						if(productData._id == undefined){
							productData._id = "product:"+new Date().toISOString();
						}
					PouchDBService.addOrUpdateData(productData).then(function (data) {
						callback({ success: true ,data : data})
					}, function (err) {
						callback({ success: false, err: err })
					})
				},

				deleteProdcutData: function (id, callback) {
					//here will send request for delete product based on id
					PouchDBService.getDocumentById(id
						).then(function (data) {
							PouchDBService.deleteOneDocument(data).then(function(doc){
								callback(true)
							}, function(delErr){
								callback(false)
							})
						}, function (err) {
							callback({ success: false, err: err })
						})
				},
				deleteMultipleProdcuts: function (docs, callback) {
					//here will send request for delete multiple products based on ids
					PouchDBService.deleteMultipleDocuments(docs).then(function (data) {
						callback(true)
					}, function (err) {
						callback(false)
					})
					
				},
			};

			return service;
		}]);