"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var app = (0, express_1.default)();
var port = process.env.PORT || 3001;
var server = require('http').createServer(app);
var io = require('socket.io')(server, { cors: { origin: '*' } });
var remindersAPI = require('./routes/reminders');
var derecho = require('./routes/derecho');
io.on('connection', function (socket) {
    socket.on('board-update', function () {
        socket.broadcast.emit('update-board');
    });
    socket.on('list-update', function () {
        socket.emit('update-list');
        socket.broadcast.emit('update-list');
    });
    socket.on('list-delete', function () {
        socket.emit('delete-list');
        socket.broadcast.emit('delete-list');
    });
});
/* app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' == req.method) {
  res.sendStatus(200);
  } else {
    next();
  }
}); */
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/reminders', remindersAPI);
app.use('/derecho', derecho);
app.use('*', function (req, res) {
    res.status(404).send('Not found');
});
server.listen(port, function () {
    console.log('Server running...');
});
module.exports = server;
