/* eslint-disable no-unused-vars */
// 此文件暂时无用 针对session redis
const Redis = require('ioredis');
// eslint-disable-next-line import/no-unresolved
const { Store } = require('koa-session2');

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
            port: 6379, // Redis port
            host: 'localhost', // Redis host
            family: 4, // 4 (IPv4) or 6 (IPv6)
            password: '123456',
            db: 0,
        });
    }

    async get(sid, ctx) {
        const data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }

    async set(session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
        // eslint-disable-next-line no-useless-catch
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
        } catch (e) {
            throw e;
        }
        return sid;
    }

    async destroy(sid, ctx) {
        // eslint-disable-next-line no-return-await
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;
