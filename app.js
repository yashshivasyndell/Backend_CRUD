const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");
const PORT = process.env.PORT;
const db = process.env.mongo;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Authroute = require('./routes/Authroute');
const dataRoute = require('./routes/dataRoute');
const wordsRoute = require('./routes/wordsRoute');
const ChatRoute = require('./routes/ChatRoute');
const Database  = require("./DB_connection/Db_conn");
const URL = process.env.url
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: URL,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    }
});

// Middleware to pass io instance to routes
app.use((req, res, next) => {
    req.io = io; 
    next();
});

// Middleware setup
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/auth', Authroute);
app.use('/users', dataRoute);
app.use('/words', wordsRoute);
app.use('/chat',ChatRoute)

// Test route
app.get("/", (req, res) => {
    res.send("Welcome");
});
const userSockets = {};
io.userSockets = userSockets
// Socket.IO event handling
io.on("connection", (socket) => {
    console.log(`A client connected with socket ID: ${socket.id}`);
    // Listen for a 'registerUser' event to map the user ID to the socket ID
    socket.on("registerUser", (userId) => {
        console.log("iam triggered");
        io.userSockets[userId] = socket.id;
        console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        const userId = Object.keys(io.userSockets).find(
            (key) => io.userSockets[key] === socket.id
        );
        if (userId) {
            delete io.userSockets[userId];
            console.log(`User ${userId} disconnected`);
        }
    });
});


// Start server (use server.listen instead of app.listen)
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

// MongoDB connection
Database() 