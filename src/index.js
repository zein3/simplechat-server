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

require('dotenv').config();
app.use(cors());

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    try {
      console.log(`${message.senderUsername}: ${message.message}`);
    } catch(err) {
      console.log('invalid message received')
    }
  })
})

server.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}.`)
})
