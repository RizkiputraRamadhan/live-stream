const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname)); 

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/preview', (req, res) => {
    res.sendFile(__dirname + '/preview.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    socket.on('candidate', (candidate) => {
        socket.broadcast.emit('candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
