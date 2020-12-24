'use strict';

angular.module('Products')

.factory('ProductService',
	['$http',
		function ($http) {
			var db = new PouchDB('inventory_user_data');
			var service = {
				loadProducts: function () {
					//here will get the all products data from DB and return;
					return new Promise (function (resolutionFunc, rejectionFunc) {
						db.find({
							selector: {
								_id: {
									$gt: "product:",
									$lt: "product:\uffff"
								}
							}
						  }, function (err, doc) {
							if (!err) {
							  resolutionFunc({success : true, data: doc.docs})
							}
							else{
								resolutionFunc({success: false, error : err})

							}
						  });
					})
					return;
				},

				getProductById: function (id) {
					//here will get the product data from DB based on id and return;
					return new Promise (function (resolutionFunc, rejectionFunc) {
						db.get(id).then(function(data, err){
							if(!err){
								resolutionFunc(data)
							}

						})
					})
				},
				
				saveData: function (productData) {
					//here will send the data to save and edit
					//if productData contain productId then send edit otherwise add 
					return new Promise (function (resolutionFunc, rejectionFunc) {
						if(productData._id == undefined){
							productData._id = "product:"+new Date().toISOString();
						}
						db.put(productData, function callback(err, result) {
							if (!err) {
							  resolutionFunc({success : true, data: result})
							}
							else{
								resolutionFunc({success: false, error : err})

							}
						  });
					})
				},
				deleteProdcutData: function (id) {
					//here will send request for delete product based on id
					return new Promise (function (resolutionFunc, rejectionFunc) {
						db.get(id).then(function(data, err){
							if(!err){
								db.remove(data).then(function(dataDel, errdel){
									if(!errdel){
										resolutionFunc(true)
									}
									else{
										resolutionFunc(false)
									}
								})

							}

						})
					})
				},
				deleteMultipleProdcuts: function (docs) {
					//here will send request for delete multiple products based on ids
					return new Promise (function (resolutionFunc, rejectionFunc) {
					db.bulkDocs(docs, function(err, response) {
						if (err) {
						   resolutionFunc(false)
						} else {
						   resolutionFunc(true)
						}
					 });
					})
				},
			};

			return service;
		}]);