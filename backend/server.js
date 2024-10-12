const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const questions = require('./questions');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

let gameStarted = false;
let currentQuestionIndex = 0;
let players = [];
let wrongAnswers = 0;

app.get('/questions', (req, res) => {
  res.json(questions);
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('joinGame', (name) => {
    const player = { id: socket.id, name, score: 0 };
    players.push(player);
    io.emit('newPlayer', player);
    if(gameStarted) socket.emit('currentQuestion', questions[currentQuestionIndex]);
    console.log(`${name} has joined the game.`);
  });

  socket.on('startGame', () => {
    gameStarted = true;
    resetScores();
    socket.emit('playerList', {currentPlayers: players});
    io.emit('newQuestion', questions[currentQuestionIndex]);
    wrongAnswers = 0;
    socket.on('disconnect', () => {
      gameStarted = false;
      currentQuestionIndex = 0;
      io.emit('gameOver');
      console.log('Host disconnected! Game Over!');
    })
    console.log('The Game is started!');
  });

  socket.on('submitAnswer', ({ answer, playerName }) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (answer === correctAnswer) {
      const player = players.find((p) => p.name === playerName);
      if (player) {
        player.score += 1;
        socket.emit('congrats');
        io.emit('correctAnswer', { name: playerName, answer: correctAnswer, updatedPlayers: players });
        console.log(`${playerName} has given the correct answer: ${correctAnswer}.`);
        nextQuestion();
      }
    } else {
      socket.emit('wrongAnswer', { name: playerName });
      wrongAnswers++;
      console.log(`${playerName} has given a wrong answer.`);
      if(players.length === wrongAnswers) {
        io.emit('allWrong', { answer: correctAnswer, updatedPlayers: players });
        console.log(`No one has given the correct answer: ${correctAnswer}.`);
        nextQuestion();
      }
    }
  });

  const resetScores = () => {
    players.forEach(player => {
      player.score = 0;
    })
  }

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
      io.emit('gameOver');
      console.log('Game Over!');
    }
  }

  socket.on('disconnect', () => {
    const playerLeft = players.find((player) => player.id === socket.id);
    players = players.filter((player) => player.id !== socket.id);
    if(playerLeft) io.emit('playerLeft', playerLeft);
    console.log(`${playerLeft ? `${playerLeft.name} left the game | ` : ''}User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});