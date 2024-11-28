const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const pollRoutes = require("./routes/polls");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const userRoutes=require('./routes/auth')
const cors = require("cors");
const path = require("path");


dotenv.config();
connectDB(); // Call the function to connect to the database
const app = express();
app.use(cors());
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Allow requests from React frontend
//     methods: ["GET", "POST"],
//   },
// });

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const protect = (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];
//     if (!token) return res.status(401).send("Access denied");
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // Store user in req object
//       next();
//     } catch (err) {
//       res.status(400).send("Invalid token");
//     }
//   };

app.use("/api/polls", pollRoutes);
app.use("/api/auth", userRoutes);


// // Socket.IO logic
// io.on("ion", (socket) => {
//   console.log("A user connected");

//   // Disconnect event
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// Make io available in routes
// app.set("socketio", io);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
