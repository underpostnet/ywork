

var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 8000}),
CLIENTS=[], USERDATA=[];

wss.on('connection', function(ws) {

  CLIENTS.push(ws);

  ws.on('message', function(message) {

    console.log('received:', message);

    var obj = JSON.parse(message);

    if(obj.state == 'new'){

      for (var i=0; i<CLIENTS.length; i++) {

        if(CLIENTS[i]==ws && USERDATA[i]==null){
          USERDATA[i]=obj;
          console.log('Connected User -> ID:'+USERDATA[i].id+' INDEX:'+i);
        }

      }

    }

    if(obj.state=='mov'){

      for (var i=0; i<CLIENTS.length; i++) {

        if(CLIENTS[i]==ws){
          
          USERDATA[i]=obj;
          console.log('Mov User -> ID:'+USERDATA[i].id+' X:'+USERDATA[i].xpos+' Y:'+USERDATA[i].ypos);

        }

      }

    }

    sendAll(message);

  });

  ws.send('User Connected');

  ws.on('close', function close() {

    for (var i=0; i<CLIENTS.length; i++) {

      if(CLIENTS[i]==ws){

        USERDATA[i].state = 'del';
        sendAll(JSON.stringify(USERDATA[i]));
        console.log('Disconnected User -> ID:'+USERDATA[i].id+' INDEX:'+i);
        CLIENTS.splice(i, 1);
        USERDATA.splice(i, 1);

      }

    }

  });

});

function sendAll (message) {
  for (var i=0; i<CLIENTS.length; i++) {
    CLIENTS[i].send(message);
  }
}
