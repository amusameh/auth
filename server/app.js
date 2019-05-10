const express = require('express');
const path = require('path');
const cors = require('cors');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const authRouter = require('./router/auth');

const app = express();

const port = process.env.PORT || 4000;

app.set('port', port);

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.use((req, res, next) => {
  console.log('req', req.url);
  next();
})

app.use(authRouter);



if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
  });
  
  app.use(favicon(__dirname, '..', '..', 'client', 'build', 'favicon.ico'));
}

module.exports = app;
