const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

app = express();

const corsOrigin = "http://localhost:3000";

app.use(bodyParser.json());
app.use(cors({
  origin: corsOrigin
}));

module.exports = app;