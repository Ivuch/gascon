(function(){
	var app = angular.module('gascon', ['ngRoute'])

	app.controller("GasconCtrl", function($scope, $http, $route, $routeParams, $location){
		var baseURL = "http://"+document.domain+":8080"
		this.$route = $route;
	    this.$location = $location;
	    this.$routeParams = $routeParams;

		this.darAgua = function(id){
			alert(id)
		}
		this.darComida = function(id){
			alert(id)
		}
		this.petInfo = function(id){

		}

		$http.get(baseURL+"/pets").then(function(res) {
			$scope.$parent.pets = res.data;
		})
	})

	app.directive("pet", function(){
		return {
			restrict: 'E',
			templateUrl: "pet.html"
		}
	})

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	    $routeProvider
	      .when('/petInfo/:petId', {
	        templateUrl: 'petInfo.html',
	        controller: 'PetInfoCtrl',
	        controllerAs: 'petInfo'
	      })
	      .when('/Book/:bookId/ch/:chapterId', {
	        templateUrl: 'chapter.html',
	        controller: 'ChapterCtrl',
	        controllerAs: 'chapter'
	      });

	    $locationProvider.html5Mode(true);
	}])

	app.controller('PetInfoCtrl', ['$routeParams', function PetInfoCtrl($routeParams) {
	  this.name = 'PetInfoCtrl';
	  this.params = $routeParams;
	}])

	var pets =[
		 {
		 	id: 12324131,
			name: "Billy",
			nickname: "Cabeza de Zapatrapo",
			msj:"¡Vamos a pasear! ¡Guff!"
		},
		{
			id: 'E3ef4aS',
			name:"Sasha",
			msj:"¡Auuuu guuh woof! ¡Brrr!"
		}
	]
})()

/*
	So, here we can use 'pet' JSON this way:

	<div ng-controller="GasconCtrl as g">
		<h1>{{g.pet.name}}</h1>
		<p>{{g.pet.nickname}}</p>
	</div>
*/