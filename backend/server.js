const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const questions = require('./questions');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Change to your frontend URL in production
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

// CORS middleware
app.use(cors());

// Serve static files
app.get('/questions', (req, res) => {
    res.json(questions);
});

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('answer', (data) => {
        const question = questions[data.questionIndex];
        if (data.answer === question.correctAnswer) {
            io.emit('correct', { name: data.name, questionIndex: data.questionIndex });
        } else {
            socket.emit('wrong', { name: data.name });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});