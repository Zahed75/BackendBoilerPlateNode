const app = require('./app');
const server = require('http').createServer(app);
const socket = require('socket.io');

const PORT = process.env.PORT || 8080;

// const client = io('http://localhost:8080');
const socketServer = socket(server, { cors: { origin: '*' } });

server.listen(PORT, function () {
  console.log('Server running on port => ' + PORT);


});

//socket-server
socketServer.on('connection', (socket) => {
  console.log('Connected to socket server');

  socket.on('disconnect', () => console.log('Disconnected'));

  socket.on('order', () => console.log('Order placed'));

  socket.on('join_room', (room) => {
    console.log({ room });
    socket.join(room);
  });

  socket.on('hello', () => console.log('Hello'));
});

app.set('io', socketServer);
