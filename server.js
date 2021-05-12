const path = require("path");
const express = require("express");
const httpolyglot = require("httpolyglot");

const app = express();
const port = process.env.PORT || 3013;

app.use(express.static(path.join(__dirname, "./", "dist")));

const httpsServer = httpolyglot.createServer({}, app);
const io = require("socket.io")(httpsServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const rooms = {};

io.on("connect", (socket) => {
  const query = socket.handshake.query;

  const currentRoom = query.room;
  const currentUser = query.user;

  if (!rooms[currentRoom]) {
    rooms[currentRoom] = {};
  }

  // Initiate the connection process as soon as the client connects
  rooms[currentRoom][socket.id] = socket;

  // Asking all other clients to setup the peer connection receiver
  const peers = rooms[currentRoom];

  for (const id in peers) {
    if (id === socket.id) continue;

    rooms[currentRoom][id].emit("initReceive", {
      user: currentUser,
      socketId: socket.id,
    });
  }

  // Relay a peerconnection signal to a specific socket
  socket.on("signal", (data) => {
    if (!rooms[currentRoom][data.socketId]) return;

    rooms[currentRoom][data.socketId].emit("signal", {
      socketId: socket.id,
      signal: data.signal,
    });
  });

  // Remove the disconnected peer connection from all other connected clients
  socket.on("disconnect", () => {
    socket.broadcast.emit("removePeer", socket.id);

    delete rooms[currentRoom][socket.id];
  });

  // Send message to client to initiate a connection the sender has already setup a peer connection receiver
  socket.on("initSend", (data) => {
    const initSocketId = data.socketId;

    rooms[currentRoom][initSocketId].emit("initSend", {
      user: currentUser,
      socketId: socket.id,
    });
  });
});

httpsServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
