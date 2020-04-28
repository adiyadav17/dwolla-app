const http = require('http');
// Bring in the database object
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
// create a token


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
