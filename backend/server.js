const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const questions = require('./questions');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

// Game state
let currentQuestionIndex = 0;
let players = [];

// Serve the questions
app.get('/questions', (req, res) => {
  res.json(questions);
});

// WebSocket communication
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Player joins the game
  socket.on('joinGame', (name) => {
    const player = { id: socket.id, name, score: 0 };
    players.push(player);
    console.log(`${name} has joined the game.`);
  });

  // Send the current question to all players
  socket.on('startGame', () => {
    io.emit('newQuestion', questions[currentQuestionIndex]);
    console.log('The Game is started!');
  });

  // Handle answer submission
  socket.on('submitAnswer', ({ answer, playerName }) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (answer === correctAnswer) {
      // Find the correct player and increment their score
      const player = players.find((p) => p.name === playerName);
      if (player) {
        player.score += 1;
        io.emit('correctAnswer', { name: playerName, answer: correctAnswer });
        console.log(`${playerName} has given the correct answer: ${correctAnswer}.`)
        nextQuestion();
      }
    } else {
      socket.emit('wrongAnswer', { name: playerName });
      console.log(`${playerName} has given a wrong answer.`)
    }
  });

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      setTimeout(() => {
        io.emit('newQuestion', questions[currentQuestionIndex]);
        console.log('New Question');
      }, 10000);
    } else {
      io.emit('gameOver', { players });
      console.log('Game Over!')
    }
  }

  socket.on('disconnect', () => {
    players = players.filter((player) => player.id !== socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});