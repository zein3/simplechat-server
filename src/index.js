const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors());

io.on('connection', (socket) => {
  console.log("a user connected.");
  socket.on('disconnect', () => {
    console.log("a user disconnected.");
  })
})

server.listen(6001, () => {
  console.log('listening on port 6001.')
})
