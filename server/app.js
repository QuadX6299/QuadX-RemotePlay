var http = require('http');
var socketio = require('socket.io')
var users = [];
var rooms = {};

/*
  room definition
  name : {
    open: false
  }
*/
function server(req, res) {
    // you should probably include something like express if you want to return responses.
    res.write("Idk how u got here but install my app at link");
}

let app = http.createServer(server);

var io = socketio(app);

io.on('connection', function(socket){
  let curRoom = null;
  console.log('A user connected');
  users.push(socket.id);
  console.log(users);
  //DC
  socket.on('disconnect', function () {
     console.log('A user disconnected');
     users.splice(users.indexOf(socket.id), 1);
  });
  //Send a list of available rooms
  socket.on('get list', () => {
    socket.emit('list_update', rooms)
  })
  //Create a new room whilst leaving current one
  socket.on('create room', (roomName) => {

    console.log(`Creating room ${roomName}`);
    if (rooms[roomName]) {
      socket.emit('error', `${roomName} is takens`);
    }
    else {
      if (curRoom) {
        socket.leave(curRoom);
      }
      socket.join(roomName);
      curRoom = roomName;
      rooms[roomName] = {
        name : roomName,
        open : true
      }
      console.log(`Current rooms ${socket.id} is in: ${JSON.stringify(rooms)}`);
    }
  })
  //join room
  socket.on('join room', (name) => {
    if (rooms[name]) {
      if (curRoom) {
        socket.leave(curRoom)
      }
      socket.join(name);
      curRoom = name;
    } else {
      socket.emit('error', "The room you are trying to join does not exist")
    }
  })
});

app.listen(4000)
