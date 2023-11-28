const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const { generateResponse } = require("./utils/helpers");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3001", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send_message", async (data) => {
    console.log(data);
    try {
      const answer = await generateResponse(data.content);
      socket.emit("receive_response", answer);
    } catch (error) {
      console.log(error);
      socket.emit("error_response", "Error occurred");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const http = require("http");
// const { Server } = require("socket.io");
// const connection = require("./config/db");
// const messageModel = require("./models/messageModel");

// dotenv.config();

// const { generateResponse } = require("./utils/helpers");

// connection();

// const app = express();

// // app.use(express.json());
// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });
//   socket.on("send_message", (data) => {
//     console.log(data);
//     socket.to(data.room).emit("receive_message", data);
//   });
//   socket.on("disconnect", () => {
//     console.log("User disconnected ", socket.id);
//   });
// });

// // io.on("connection", (socket) => {
// //   console.log("User connected");

// //   socket.on("send_message", async (data) => {
// //     console.log(data);
// //     try {
// //       await new messageModel({
// //         author: data.author,
// //         content: data.content,
// //       }).save();
// //       const answer = await generateResponse(data.content);
// //       socket.emit("receive_response", answer);
// //     } catch (error) {
// //       console.log(error);
// //       socket.emit("error_response", "Error occurred");
// //     }
// //   });
// // });

// const PORT = 5001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
