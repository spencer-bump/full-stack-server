// common js - pre es2015
const express = require('express');

// ************
// APP
// ************
const app = express();


// ************
// ROUTES
// ************
app.get('/', (req, res) => {
  res.send({ hi: 'there'})
});


// ************
// START SERVER
// ************
const PORT = process.env.PORT || 5000;
app.listen(PORT);
