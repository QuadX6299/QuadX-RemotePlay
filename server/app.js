var app = require('express')();
var http = require('http').Server(app);
var sio = require('socket.io');

app.get("/", (req, res) => {
  res.sendfile('index.html');
})
let server = app.listen(4000, () => {
  console.log("Listening on 4K");
})
let io = sio(server);

io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});
