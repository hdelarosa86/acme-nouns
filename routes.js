const app = require('express').Router();
const db = require('./db');

app.get('/people', async (req, res, next) => {
  try {
res.send(await db.models.Persons.findAll( {include: [db.models.Places, db.models.Things]}));
  } catch (err) {
    console.log(err.message);
  }
});
app.get('/places', async (req, res, next) => {
  try {
    res.send(await db.models.Places.findAll());
  } catch (err) {
    console.log(err.message);
  }
});
app.get('/things', async (req, res, next) => {
  try {
    res.send(await db.models.Things.findAll());
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = app;