var baseURL = "http://"+document.domain+":8080"
function getNewXHRObject(){
  var xhr
  if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()// code for IE7+, Firefox, Chrome, Opera, Safari
  } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
    }
  return xhr;
}

/** 
LOGIN function():
  Si el status = 200 inicia 
  El Content-type Negociation: 
        Si es "application/json" -->login con error (se setea la clase .error de CSS)
        Si es cualquier otro  -->> se hace un render al xhr.responseText (debería ser un HTML)
**/
function login(){
  var url = baseURL+"/login"
  var user = document.getElementById("loginForm").elements["user"]
  var pass = document.getElementById("loginForm").elements["pass"]
  var params = "user="+user.value+"&password="+pass.value
  var xhr = getNewXHRObject()
  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params)
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
       if(xhr.status == 200){
          var content = xhr.getResponseHeader("Content-Type")
          if(content == "application/json; charset=utf-8"){
            var json = JSON.parse(xhr.responseText)
            if(json.isERROR){
              user.classList.add("error")
              pass.classList.add("error")
            }
          }else{
            document.open()
            document.write(xhr.responseText)
            document.close()
          }  
        }else if(xhr.status == 400) {
          alert('There was an error 400')
        }else {
          alert('something else other than 200 was returned')
      }
    }
  }
}

function user5(){
  var url = baseURL+"/user"
  alert("voy bien")
  var user = document.getElementById("userForm").elements["user"]
  var nickname =document.getElementById("userForm").elements["nickname"]
  var email= document.getElementById("userForm").elements["email"]
  var cel = document.getElementById("userForm").elements["cel"]
  var pass = document.getElementById("userForm").elements["pass"]
 // var passConfirm = document.getElementById("userForm").elements["passConfirm"]
  var params = "user="+user.value+"&nickname="+nickname.value+"&email="+email.value+"&cel="+cel.value+"&password="+pass.value
  var xhr = getNewXHRObject()
  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params)
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
       if(xhr.status == 200){
          var content = xhr.getResponseHeader("Content-Type")
          if(content == "application/json; charset=utf-8"){
            var json = JSON.parse(xhr.responseText)
            if(json.isERROR){

            }
          }else{
            document.open()
            document.write(xhr.responseText)
            document.close()
          }  
        }else if(xhr.status == 400) {
          alert('There was an error 400')
        }else {
          alert('something else other than 200 was returned')
      }
    }
  }
}

 /* AJAX Request Template2: "HTTP POST verb - Chat AJAX implementation."
function ajaxReq(){
  var text = document.getElementById("chatForm").elements["text"]
  var chat = document.getElementById("chatContent")
  var url = baseURL+"/text"
  var params = "text="+text.value
  var xhr = getNewXHRObject()
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
     if(xhr.status == 200){
     		var json = JSON.parse(xhr.responseText)        
        var finalMsg = getEmojis(json.text)
        chat.innerHTML = chat.innerHTML+'<br>'+'<span>'+finalMsg+'</span>';
        updateScroll()
        text.value = ""
      }
      else if(xhr.status == 400) {
        alert('There was an error 400')
      }
      else {
         alert('something else other than 200 was returned')
      }
    }
  }
}
*/