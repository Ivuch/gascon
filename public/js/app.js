(function(){
	var app = angular.module('main', ['ngRoute'])

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	    $routeProvider
	      .when('/', {
	        templateUrl: 'petIndex.html',
	        controller: 'PetCtrl',
	        controllerAs: 'p'
	      })
	      .when('/petInfo/:pet_id', {
	        templateUrl: 'petInfo.html',
	        controller: 'PetInfoCtrl',
	        controllerAs: 'petInfo'
	      })
	      .when('/addPet', {
	        templateUrl: 'addPet.html',
	        controller: 'PetCreateCtrl',
	        controllerAs: 'petCreate'
	      })
	      .otherwise({redirectTo:'/'});

	    $locationProvider.html5Mode(true);
	}])

	app.controller("MainCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function($scope, $http, $route, $routeParams, $location){
		var baseURL = "http://"+document.domain+":8080"
		this.$route = $route;
	    this.$location = $location;
	    this.$routeParams = $routeParams;
	}])

	app.directive("pet", function(){
		return {
			restrict: 'E',
			templateUrl: "pet.html"
		}
	})

	

	app.controller("PetInfoCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function PetInfoCtrl($scope, $http, $route, $routeParams, $location) {
	  this.name = "PetInfoCtrl"
	  this.params = $routeParams
	  this.deletePet = function(pet){
	  	if(confirm("¡Estás por ELIMINAR a "+pet.name+"! ¿Seguro deseas continuar? :'(")){
	  		$http.delete(baseURL+"/pets/"+this.params.pet_id).then(function(res){
	  			alert(res.data.message)
	  			$location.path('/')
	  		})
	  	}  	
	  }
	  $http.get(baseURL+"/pets/"+this.params.pet_id).then(function(res){
	  	$scope.$parent.pet = res.data
	  })

	}])

	app.controller("PetCreateCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function PetCreateCtrl($scope, $http, $route, $routeParams, $location) {
	  this.name = "PetCreateCtrl"
	  this.params = $routeParams
	  $scope.createPet = function(pet){
		  $http.post(baseURL+"/pets", pet).then(function(res){
		  	alert("¡"+pet.name+" creado!")
		  	$location.path('/')
		  })
	  }
	}])

})()

/*
	So, here we can use 'pet' JSON this way:

	<div ng-controller="GasconCtrl as g">
		<h1>{{g.pet.name}}</h1>
		<p>{{g.pet.nickname}}</p>
	</div>
*/