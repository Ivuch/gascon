(function(){
	var app = angular.module('gascon', ['ngRoute'])

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
	        templateUrl: 'addPet.html'
	      })
	      .otherwise({redirectTo:'/'});

	    $locationProvider.html5Mode(true);
	}])

	app.controller("GasconCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function GasconCtrl($scope, $http, $route, $routeParams, $location){
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

	app.controller("PetCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function PetInfoCtrl($scope, $http, $route, $routeParams, $location) {
      this.darAgua = function(pet){
			if(confirm("Estás seguro que "+pet.name+" tomó agua?")){
				alert("tomó!")
			}else{
				alert("no tomó :'(")
			}
	  }
	  this.darComida = function(pet){
	      alert(pet)
	  }
	  $http.get(baseURL+"/pets/").then(function(res){
	  	$scope.$parent.pets = res.data
	  })
	  /***************************************MODULO2: 'Las franjas Horarias' ***********************************************/


	//the year, month, day, hour, minute, (second, and millisecond) in that order:
	a = new Date(00,1,0,12,0)
	b =new Date(00,1,0,15,0);
	now = new Date()
	if(now.getHours() >= a.getHours()-1 && now.getHours() <= b.getHours()-1)
	{
		alert(now.getHours())
		document.getElementById('proxComida').innerHTML = "Almuerzo"
		document.getElementById('info').innerHTML = "de "+a.getHours()+":"+checkTime(a.getMinutes())+" a "+b.getHours()+":"+checkTime(b.getMinutes())
	}else{
		
	}


	/*********************************************************************************************************************/


	////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////



	/***************************************MODULO1: 'La Hora Actualizada' ***********************************************/
	function checkTime(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}
	var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
	function startTime() {
	    var today = new Date()
	    var h = today.getHours()
	    var m = today.getMinutes()
	    var s = today.getSeconds()
	    var D = today.getUTCDate()
	    var M = months[today.getMonth()]
	    // add a zero in front of numbers<10
	    m = checkTime(m)
	    s = checkTime(s)
	    document.getElementById('time').innerHTML ="hora: "+h+":"+m+":"+s
	    t = setTimeout(function () {
	        startTime()
	    }, 500);
	}
	startTime();

	/***********************************************************************************************/
	}])

	app.controller("PetInfoCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function PetInfoCtrl($scope, $http, $route, $routeParams, $location) {
	  this.name = "PetInfoCtrl"
	  this.params = $routeParams
	  this.deletePet = function(pet){
	  	if(confirm("¡Estás por ELIMINAR a "+pet.name+"! ¿Seguro deseas continuar? :'(")){
	  		$http.delete(baseURL+"/pets/"+this.params.pet_id).then(function(res){
	  			alert(res.data.message)
	  		})
	  	}  	
	  }
	  $http.get(baseURL+"/pets/"+this.params.pet_id).then(function(res){
	  	$scope.$parent.pet = res.data
	  })

	}])
})()

/*
	So, here we can use 'pet' JSON this way:

	<div ng-controller="GasconCtrl as g">
		<h1>{{g.pet.name}}</h1>
		<p>{{g.pet.nickname}}</p>
	</div>
*/