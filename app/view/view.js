'use strict';

angular.module('calculator.view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view/view.html',
    controller: 'ViewCtrl'
  });
}])

.controller('ViewCtrl', ['$scope', 'io', function($scope, io) {
	var message = {
		id: '',
		name: '',
		body: ''
	}

	$scope.user = {
		name: ''
	}

	$scope.messages = [];

	// On form submit, send socket message... add loading class until message is in the list then clear form
	
	io.on('init', function (user) {
		$scope.user = user;
	});

	io.on('send:message', function (message) {
		console.log(message);
		$scope.messages.push(message);
	});

	$scope.send = function() {
		$scope.messages.push({
			user: {
			    name: $scope.user.name
			},
			body: $scope.message
	    });
		io.emit('send:message', $scope.message);
		$scope.message = '';
	}
}]);