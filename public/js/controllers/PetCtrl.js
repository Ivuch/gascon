angular.module('main')

.controller("PetCtrl", ['$scope', '$http', '$route', '$routeParams', '$location', function($scope, $http, $route, $routeParams, $location) {
       
      $http.get(baseURL+"/pets/").then(function(res){
	  	$scope.$parent.pets = res.data
	  })

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
    /***************************************MODULO2: 'Las franjas Horarias' ***********************************************/
	//the year, month, day, hour, minute, (second, and millisecond) in that order:
	a = new Date(00,1,0,12,0)
	b =new Date(00,1,0,15,0);
	now = new Date()
	if(now.getHours() >= a.getHours()-1 && now.getHours() <= b.getHours()-1)
	{
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