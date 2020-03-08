const Redis = require('ioredis');
const MAX_AGE = 1000000;

const config = {
    port: 6379,          // Redis port
    host: process.env.REDIS_HOST || 'localhost',   // Redis host
    // ttl: 15,  //过期时间   
    family: 4,
    db: 0
}

const redis = new Redis(config);

module.exports = {
    redis,
    MAX_AGE
}

