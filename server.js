const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const chalk = require('chalk');

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    console.log(err.message);
  }
});
app.use('/api', require('./routes')); //loads routes from routes.js

db.syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.yellow(`Serving on port: ${PORT}`));
  });
});
