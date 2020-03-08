const Sequelize = require('sequelize');
const config = require('./config');

module.exports =  new Sequelize(config.database, config.username, config.password, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
