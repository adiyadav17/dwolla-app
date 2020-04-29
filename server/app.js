const http = require('http');
// Bring in the database object
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
//
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET, OPTIONS");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  return res.json({
    message: "test api"
  });
});

const users = require('./routes/users');
app.use('/api/users', users);

// Defining the PORT
const PORT = process.env.PORT || 5000;

http.createServer(app).listen(5000);
//http.createServer(corsOptions, app).listen(443);
