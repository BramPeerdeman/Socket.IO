const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/:id', (req, res) => {

    if(req.params.id == "client" ){
      res.sendFile(__dirname + '/client.html');
    }else{
      res.sendFile(__dirname + '/main.html');
    }
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// Wanneer een socket een bericht verzendt


io.on('connection', (socket) => {  
    // Wanneer een socket het setScreen event verzendt
    socket.on('setScreenID', (id, screen) => {
      console.log(`Screen ${screen} ID set to: ${id}`);
      if(screen == "client"){
        io.emit('setClientID', id);
      }
    });
    socket.on('message', ({msg,to}) => {
    console.log(`Socket ${socket.id} sent message: ${msg}`);
    // Stuur het bericht naar de juist socket / client
    socket.to(to).emit('message', msg);
});
})

