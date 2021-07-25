// common js - pre es2015
const express = require('express');

// ************
// APP
const app = express();
const port = 5000;


app.get('/', (req, res) => {
  res.send({ hi: 'there'})
});


app.listen(port);
