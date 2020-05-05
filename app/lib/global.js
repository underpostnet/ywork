//Global Functions

function f(div, css){

  return parseFloat($(div).css(css).replace('px', ''));

}

function random(min, max){

  return Math.floor(Math.random() * (max - min + 1) ) + min;

}

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function getID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

//WS

function runWS(time, log, url){

  socket = new WebSocket(url);

  //console.log(socket);

  setInterval(function(){

    if(socket.readyState==0){
      //WebSocket.CONNECTING
      if(log){console.log('ws server connecting -> state:0');}

      $('.ws-stat-s').css('color', 'yellow');
      $('.ws-stat-s').html('[CONNECTING]');

    }

    if(socket.readyState==1){
      //WebSocket.OPEN
      if(log){console.log('ws server on -> state:1');}

      $('.ws-stat-s').css('color', 'green');
      $('.ws-stat-s').html('[ON]');

    }

    if(socket.readyState==2){
      //WebSocket.CLOSING
      if(log){console.log('ws server closing -> state:2');}

      $('.ws-stat-s').css('color', 'yellow');
      $('.ws-stat-s').html('[CLOSING]');

    }

    if(socket.readyState==3){
      //WebSocket.CLOSED
      if(log){console.log('ws server closed -> state:3');}

      $('.ws-stat-s').css('color', 'red');
      $('.ws-stat-s').html('[OFF]');

      setTimeout(function(e){

        location.reload();

      }, 5000);      

    }

  }, time);

}
var socket;

//Protect Functions

document.oncontextmenu = function(){ return false; }

document.ondragstart = function(){ return false; }

document.onselectstart = function(){ return false; }
