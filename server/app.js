var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.urlencoded({extended:true}))
app.use(express.json())

var users = [];
var rooms = {
  'QuadX-RemotePlay' : {
    population : 0,
    maxPopulation : 2,
    password : "blue42sethut"
  },
  'QuadX-RemotePlay0' : {
    population : 0,
    maxPopulation : 2,
    password : "blue42sethut"
  },
  'QuadX-RemotePlay1' : {
    population : 0,
    maxPopulation : 2,
    password : "blue42sethut"
  },
  'QuadX-RemotePlay2' : {
    population : 0,
    maxPopulation : 2,
    password : "blue42sethut"
  },
  'QuadX-RemotePlay3' : {
    population : 0,
    maxPopulation : 2,
    password : "blue42sethut"
  },
  'QuadX-RemotePlay4' : {
    population : 0,
    maxPopulation : 2,
    password : "blue42sethut"
  },
  'QuadX-RemotePlay5' : {
    population : 0,
    maxPopulation : 2,
    password : "blue42sethut"
  }
};

/*
  room definition
  name : {
    population : 0,
    maxPopulation : 2,
    password: "etc",
    name: {
      "Daniel" : socket.id
    }
  }
*/
app.post('/validate', function(req, res,next) {
  console.log(req.body);
  res.send(rooms[req.body.name].password == req.body.password)
});

function delTimeout(roomtbd) {
  setTimeout(() => {
    if (rooms[roomtbd]) {
      if (rooms[roomtbd].population <= 0) {
        delete rooms[roomtbd]
      }
    }
  }, 60 * 1000)
}


io.on('connection', function(socket){
  let curRoom = null;
  console.log('A user connected');
  users.push(socket.id);
  console.log(users);
  //DC
  socket.on('disconnect', function () {
    if (curRoom) {
      rooms[curRoom].population--;

    }
    console.log('A user disconnected');
    users.splice(users.indexOf(socket.id), 1);
  })
  //Send a list of available rooms
  socket.on('get updated rooms', () => {
    socket.emit('list_update', Object.keys(rooms));
  })
  //Create a new room whilst leaving current one
  socket.on('create room', (room) => {
    rooms[room.name] = {
      population: 1,
      maxPopulation: room.max,
      password: room.password,
      name : {}
    }
    socket.join(room.name)
    curRoom = room.name
  })
  //join room
  socket.on('join room', (room) => {
    if (rooms[room.name].password == room.password) {
      if (curRoom) socket.leave(curRoom);
      socket.join(room.name);
      rooms[room.name].population++;
      curRoom = room.name;
    }
  })
  //leave room
  socket.on('leave room', () => {
    if (curRoom) {
      delTimeout(curRoom)
      socket.leave(curRoom)
      curRoom = null
    }
  })
  //set name
  socket.on('set name', (name) => {
    rooms[curRoom].name[name] = socket.id;
    socket.to(curRoom).emit('user_update', Object.keys(rooms[curRoom].name))
  })
  //receive controller data and send to all in current room
  socket.on('update broadcast', (data, id) => {
    console.log(data);
    socket.to(curRoom).emit('update', data, id);
  })
});

server.listen(4000)
