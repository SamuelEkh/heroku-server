import express from 'express';
import { Socket } from 'socket.io';
const cors = require('cors');
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 3001;
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const remindersAPI = require('./routes/reminders');
const derecho = require('./routes/derecho');
const visimusic = require('./routes/visimusic');
const portfolio = require('./routes/portfolio');

mongoose.connect(`mongodb+srv://Samuel:${process.env.REMINDERS_DB_KEY}@cluster0.tffuu.mongodb.net/Reminders?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then((res: any) => console.log('Database connected'));

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
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/reminders', remindersAPI);

app.use('/derecho', derecho);

app.use('/visimusic', visimusic);

app.use('/portfolio', portfolio);

app.use('*', (req, res) => {
  res.status(404).send('Not found');
});

server.listen(port, () => {
  console.log('Server running...');
});

module.exports = server;
