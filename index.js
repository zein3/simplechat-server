const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

require('dotenv').config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use('/', express.static('public'));

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    try {
      console.log(`${message.senderUsername}: ${message.message}`);
      socket.broadcast.emit('message', message);
    } catch(err) {
      console.log('invalid message received')
    }
  })
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`)
})
