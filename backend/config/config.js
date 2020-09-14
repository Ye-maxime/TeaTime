require('dotenv').config();

module.exports = {
    //   endpoint: process.env.API_URL,
    //   masterKey: process.env.API_KEY,
    nodeEnv: process.env.NODE_ENV,
    // SERVER
    port: process.env.PORT,
    // DATABASE
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUserName: process.env.DB_USER_NAME,
    dbUserPwd: process.env.DB_PWD,
    // REDIS
    redisHost: process.env.REDIS_HOST,
    // RABBITMQ
    rabbitmqConnURL: process.env.RABBITMQ_CONN_URL,
};
