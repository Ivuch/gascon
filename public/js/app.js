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
	      .when('/admin', {
	      	templateUrl: 'admin.html',
	      	controller: 'AdminCtrl',
	      	controllerAs: 'admin'
	      })
	      .when('/users/:_id', {
	      	templateUrl: 'editUser.html',
	      	controller: 'UserCtrl',
	      	controllerAs: 'user'
	      })
	      .otherwise({redirectTo:'/'});

	    $locationProvider.html5Mode(true);
	}])

	app.controller("MainCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function($scope, $http, $route, $routeParams, $location){
		var baseURL = ""
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

	app.controller("UserCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function($scope, $http, $route, $routeParams, $location){
		this.user ={}
		$http.get("/users/"+$routeParams._id).then(function(res){
			$scope.user = res.data
			document.getElementById('userjson'). innerHTML = JSON.stringify(res.data)

		})
	}])
	
	app.controller("AdminCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function($scope, $http, $route, $routeParams, $location){
		$http.get("/users").then(function(res){
			var json = res.data
            var l = json.length
            var sect = document.getElementById("sector")
            for (i=0; i<l; i++){
            	var row = sect.insertRow(i);
            	row.insertCell(0).innerHTML = json[i].user
            	row.insertCell(1).innerHTML = json[i].nickname
            	row.insertCell(2).innerHTML = json[i].email
            	row.insertCell(3).innerHTML = json[i].password
            	row.insertCell(4).innerHTML = "<a style='text-decoration:none' href='/users/"+json[i]._id+"'>e</a>"
			}
		})
	}])

	app.controller("PetInfoCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function PetInfoCtrl($scope, $http, $route, $routeParams, $location) {
	  this.name = "PetInfoCtrl"
	  this.params = $routeParams
	  this.deletePet = function(pet){
	  	if(confirm("¡Estás por ELIMINAR a "+pet.name+"! ¿Seguro deseas continuar? :'(")){
	  		$http.delete("/pets/"+this.params.pet_id).then(function(res){
	  			alert(res.data.message)
	  			$location.path('/')
	  		})
	  	}  	
	  }
	  $http.get("/pets/"+this.params.pet_id).then(function(res){
	  	$scope.$parent.pet = res.data
	  })

	}])

	app.controller("PetCreateCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function PetCreateCtrl($scope, $http, $route, $routeParams, $location) {
	  this.name = "PetCreateCtrl"
	  this.params = $routeParams
	  $scope.createPet = function(pet){
		  $http.post("/pets", pet).then(function(res){
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