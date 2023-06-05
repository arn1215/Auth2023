const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');
const isProduction = environment === 'production';
const { createServer } = require('http');
const WebSocket = require('ws')
const db = require('../backend/db/models');
const session = require('express-session');
const passport = require('passport')
const passportSetup = require("./passport")

//initialize app
const app = express();



//middleware for logging reqs/resp info
app.use(morgan('dev'));

// Configure session middleware
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }
  ));
}


// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);
// todo

app.use(routes)


// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});
module.exports = app;

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack

  });
});

const server = createServer(app)

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection success! Sequelize is ready to use...', process.env.DB_FILE);

    // Sync the models and start listening for connections



    //with this line we can use the server we already have to also listen for ws connections
    const wss = new WebSocket.Server({ server })

    // Keep track of connected clients and which room they are in
    const clients = new Map(); // maps socket to room ID

    wss.on("connection", (ws) => {
      // Listen for join room message from client
      ws.on("message", (jsonData) => {
        const message = JSON.parse(jsonData);
        const { type, data } = message;
        if (type === "send-chat-message") {

          const { roomId } = data;
          console.log(`Client joined room ${roomId}`);

          clients.set(ws, roomId);
          // Broadcast message to all clients in the same room as sender
          const senderRoomId = clients.get(ws);

          if (!senderRoomId) {
            console.log("Error: client not in a room");
            return;
          }

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && clients.get(client) === senderRoomId) {
              client.send(jsonData);
            }
          });
        }
      });

      // Remove client from room when connection closes
      ws.on("close", () => {
        clients.delete(ws);
      });
    });

    server.listen(10000,  () => console.log(`Listening on port ${8000}...`));
  })
  .catch((err) => {
    console.log('Database connection failure.');
    console.error(err);
  });


