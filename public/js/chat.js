
var socket = io();

/**  AJAX Request Template1:  .broadcast**/
function sendMsg(){
  var text = document.getElementById("chatForm").elements["text"]
  var chat = document.getElementById("chatContent")
  socket.emit('chat message', text.value)
  var finalMsg = getEmojis(text.value)
  chat.innerHTML = chat.innerHTML+'<br>'+'<span class="ownMsg">'+finalMsg+'</span>'
  text.value = ""
  updateScroll()
}

socket.on('chat message', function(msg){
  var chat = document.getElementById("chatContent")
  var finalMsg = getEmojis(msg)
  chat.innerHTML = chat.innerHTML+'<br>'+'<span id="othersMsg">'+finalMsg+'</span>';
  updateScroll()
});

function getEmojis(msg){
    var finalMsg = msg.replace(/:P/g, '<img src="images/emoticons/lengua2.gif"/>')
        finalMsg = finalMsg.replace(/:p/g,'<img src="images/emoticons/lengua2.gif"/>')
        finalMsg = finalMsg.replace(/\(H\)/g, '<img src="images/emoticons/canchero2.gif"/>')
        finalMsg = finalMsg.replace(/\(h\)/g, '<img src="images/emoticons/canchero2.gif"/>')
        finalMsg = finalMsg.replace(/:oc/g,'<img src="images/emoticons/seeclaro.gif"/>')
        finalMsg = finalMsg.replace(/\(U\)/g,'<img src="images/emoticons/brheart.gif"/>')
        finalMsg = finalMsg.replace(/\(u\)/g,'<img src="images/emoticons/brheart.gif"/>')
        finalMsg = finalMsg.replace(/:O/g,'<img src="images/emoticons/oooo.gif"/>')
        finalMsg = finalMsg.replace(/:o/g,'<img src="images/emoticons/oooo.gif"/>')
        finalMsg = finalMsg.replace(/nono/g,'<img src="images/emoticons/nono.gif"/>')
        finalMsg = finalMsg.replace(/\(L\)/g,'<img src="images/emoticons/heart.gif"/>')
        finalMsg = finalMsg.replace(/\(l\)/g,'<img src="images/emoticons/heart.gif"/>')
        finalMsg = finalMsg.replace(/:\)/g,'<img src="images/emoticons/smile.gif"/>')
        finalMsg = finalMsg.replace(/:\(/g,'<img src="images/emoticons/sad.gif"/>')
        finalMsg = finalMsg.replace(/:D/g,'<img src="images/emoticons/happy.gif"/>')
        finalMsg = finalMsg.replace(/dddd/g,'<img src="images/emoticons/lengua.gif"/>')
        finalMsg = finalMsg.replace(/noniii/g,'<img src="images/emoticons/noni.gif"/>')
        finalMsg = finalMsg.replace(/;\)/g,'<img src="images/emoticons/wink.gif"/>')
        return finalMsg
}

var scrolled = false;
function updateScroll(){
    if(!scrolled){
        var element = document.getElementById("chatContent");
        element.scrollTop = element.scrollHeight;
    }
}
/*If you want to scrolldown ONLY if the user didn't move
$("#yourDivID").on('scroll', function(){
    scrolled=true;
});
*/

//Para reemplazar código String por Emoji en el mismo Textbox
var textBox = $("input[name=text]")
textBox.change(function(){
  var a = textBox.val().replace(':P', '<img src="images/emoticons/lengua2.gif" alt=":P" />')
  textBox.html(a)
})