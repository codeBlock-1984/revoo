const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/dist')));

module.exports = app;
