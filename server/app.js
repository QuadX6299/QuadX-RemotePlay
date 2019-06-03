var app = require('express')();
var http = require('http').Server(app);
var sio = require('socket.io');
var users = [];

let server = app.listen(4000, () => {
  console.log("Listening on 4K");
})
let io = sio(server);


io.on('connection', function(socket) {
   let curRoom = null;
   console.log('A user connected');
   users.push(socket.id);
   console.log(users);
   socket.on('disconnect', function () {
      console.log('A user disconnected');
      users.splice(users.indexOf(socket.id), 1);
   });
   socket.on('join room', (name) => {
     if (curRoom) socket.leave(curRoom);
     socket.join(name);
     curRoom = name;
   })
   socket.on('sending', (id) => {
     io.to(id).emit("ready");
     console.log(id);
   })
   socket.on('log', (data) => {
     console.log(data);
   })
   socket.on('update', (data) => {
     socket.broadcast.to(curRoom).emit("update", data);
   })
  socket.on('tunnelling', () => {
    socket.broadcast.to(curRoom).emit("usb connect");
  })
});
