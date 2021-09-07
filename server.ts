import express from 'express';
import path from 'path';
import { Socket } from 'socket.io';

const app = express();
const port = process.env.PORT || 3001;
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const remindersAPI = require('./routes/reminders');

/* app.use('/', express.static(path.join(__dirname, '../client/build'))); */

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

app.use('/reminders', remindersAPI);

app.use('*', (req, res) => {
  res.status(404).send('Not found');
})

/* app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
}); */

server.listen(port, () => {
  console.log('Server running...');
});

module.exports = server;
