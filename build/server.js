"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3001;
var server = require('http').createServer(app);
var io = require('socket.io')(server, { cors: { origin: '*' } });
var remindersAPI = require('./routes/reminders');
/* app.use('/', express.static(path.join(__dirname, '../client/build'))); */
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
app.use('/reminders', remindersAPI);
app.use('*', function (req, res) {
    res.status(404).send('Not found');
});
/* app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
}); */
server.listen(port, function () {
    console.log('Server running...');
});
module.exports = server;
