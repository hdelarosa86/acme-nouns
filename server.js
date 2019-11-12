const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;
const path = require('path');
const db = require('./db');
console.log(db);

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/people', async (req, res, next) => {
  try {
    res.send(await db.models.Persons.findOne());
  } catch (err) {
    console.log(err.message);
  }
});
app.get('/api/places', async (req, res, next) => {
  try {
    res.send(await db.models.Places.findAll());
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/things', async (req, res, next) => {
    try {
        res.send(await db.models.Things.findAll());
    } catch (err) {
      console.log(err.message);
    }
  });
db.syncAndSeed().then( () => {
    app.listen(PORT, () => {
        console.log(`Serving on port: ${PORT}`);
      });
});

