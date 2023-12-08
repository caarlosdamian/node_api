const express = require('express');
const app = express();

// routes

// request => user request
// response => server response

app.get('/', (req, res) => {
  res.send('Hello node api');
});

app.listen(3000, () => {
  console.log(`Node api app is running on port 3000`);
});
