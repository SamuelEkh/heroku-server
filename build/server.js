"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3001;
var server = require('http').createServer(app);
var io = require('socket.io')(server, { cors: { origin: '*' } });
var remindersAPI = require('./routes/reminders');
var derecho = require('./routes/derecho');
var visimusic = require('./routes/visimusic');
mongoose_1.default.connect("mongodb+srv://Samuel:" + process.env.REMINDERS_DB_KEY + "@cluster0.tffuu.mongodb.net/Reminders?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(function (res) { return console.log('Database connected'); });
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
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/reminders', remindersAPI);
app.use('/derecho', derecho);
app.use('/visimusic', visimusic);
app.use('*', function (req, res) {
    res.status(404).send('Not found');
});
server.listen(port, function () {
    console.log('Server running...');
});
module.exports = server;
