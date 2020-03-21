const Sequelize = require('sequelize');
const config = require('./config');

console.log(`all environment variables!!! nodeEnv = ${config.nodeEnv}, dbHost = ${config.dbHost}, 
redisHost = ${config.redisHost}, rabbitmqConnURL=${config.rabbitmqConnURL}`);

module.exports = new Sequelize(config.dbName, config.dbUserName, config.dbUserPwd, {
    host: config.dbHost || 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
