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
let gameStarted = false;
let currentQuestionIndex = 0;
let players = [];
let wrongAnswers = 0;

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
    if(gameStarted) socket.emit('currentQuestion', questions[currentQuestionIndex]);
    console.log(`${name} has joined the game.`);
  });

  // Send the current question to all players
  socket.on('startGame', () => {
    gameStarted = true;
    io.emit('newQuestion', questions[currentQuestionIndex]);
    wrongAnswers = 0;
    socket.on('disconnect', () => {
      gameStarted = false;
      currentQuestionIndex = 0;
      io.emit('gameOver', { players });
      console.log('Host disconnected! Game Over!')
    })
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
      wrongAnswers++;
      console.log(`${playerName} has given a wrong answer.`);
      if(players.length === wrongAnswers) {
        io.emit('allWrong', { answer: correctAnswer });
        console.log(`No one has given the correct answer: ${correctAnswer}.`);
        nextQuestion();
      }
    }
  });

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      setTimeout(() => {
        io.emit('newQuestion', questions[currentQuestionIndex]);
        wrongAnswers = 0;
        console.log('New Question');
      }, 5000);
    } else {
      gameStarted = false;
      currentQuestionIndex = 0;
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