'use strict';

angular.module('InventoryManagement')

	.factory('PouchDBService',
		['$http',
			function ($http) {
				var db = new PouchDB('inventory_user_data');
				var service = {
					getData: function (query) {
						return new Promise(function (resolutionFunc, rejectionFunc) {
							db.find({
								selector: query
							}, function (err, doc) {
								if (err) {

									rejectionFunc(err)
								}
								resolutionFunc(doc)
							})
						})
					},

					addOrUpdateData: function (data) {
						return new Promise(function (resolutionFunc, rejectionFunc) {
							db.put(data, function callback(err, result) {
								if (!err) {
									resolutionFunc(result);
								}
								rejectionFunc(err)

							})
						});
					},

					getDocumentById: function (id) {
						return new Promise(function (resolutionFunc, rejectionFunc) {
							db.get(id).then(function (data, err) {
								if (!err) {
									resolutionFunc(data)
								}
								else {
									rejectionFunc(err)
								}

							})
						})
					},

					deleteOneDocument: function (data) {
						return new Promise(function (resolutionFunc, rejectionFunc) {
							db.remove(data).then(function (dataDel, errdel) {
								if (!errdel) {
									resolutionFunc(true)
								}
								else {
									rejectionFunc(false)
								}
							})

						})
					},

					deleteMultipleDocuments : function(data){
						return new Promise (function (resolutionFunc, rejectionFunc) {
							db.bulkDocs(data, function(err, response) {
								if (!err) {
								   resolutionFunc(response)
								} else {
								   rejectionFunc(err)
								}
							 });
							})
					}

				};
				return service;
			}]);