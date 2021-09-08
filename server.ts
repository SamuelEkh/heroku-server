import express from 'express';
import { Socket } from 'socket.io';
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const remindersAPI = require('./routes/reminders');
const derecho = require('./routes/derecho');

io.on('connection', (socket: Socket) => {
  socket.on('board-update', () => {
    socket.broadcast.emit('update-board');
  });
  socket.on('list-update', () => {
    socket.emit('update-list');
    socket.broadcast.emit('update-list');
  });
  socket.on('list-delete', () => {
    socket.emit('delete-list');
    socket.broadcast.emit('delete-list');
  });
});

app.use(cors({ 
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use('/reminders', remindersAPI);

app.use('/derecho', derecho);

app.use('*', (req, res) => {
  res.status(404).send('Not found');
});

server.listen(port, () => {
  console.log('Server running...');
});

module.exports = server;
