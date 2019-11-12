const Sequelize = require('sequelize'); //uppercase due to being a class constructor
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/nouns_db', {logging: false});
// const Op = Sequelize.Op;
const chalk = require('chalk');

const Persons = db.define('person', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
  },
});
const Places = db.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
  },
});
const Things = db.define('things', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
  },
});

Persons.belongsTo(Places);
Places.hasMany(Persons);

Persons.belongsTo(Things);
Things.hasMany(Persons);

const syncAndSeed = async () => {
  try {
    await db.sync({
      force: true,
    });
    const [fullstack, trainStation] = await Promise.all([
      Places.create({ name: 'Fullstack' }),
      Places.create({ name: 'trainstation' }),
    ]);
    const [laptop, phone] = await Promise.all([
      Things.create({ name: 'laptop' }),
      Things.create({ name: 'phone' }),
    ]);
    const [moe, larry, curly] = await Promise.all([
      Persons.create({
        name: 'Moe',
        placeId: fullstack.id,
        thingId: laptop.id,
      }),
      Persons.create({
        name: 'Larry',
        placeId: fullstack.id,
        thingId: phone.id,
      }),
      Persons.create({
        name: 'Curly',
        placeId: trainStation.id,
        thingId: laptop.id,
      }),
    ]);
  } catch (err) {
    console.log(chalk.red(err, err.message));
  }
};
module.exports = {
  syncAndSeed,
  models: {
    Persons,
    Places,
    Things,
  },
};
