// import { Redis } from '@upstash/redis';

// export const redis = Redis.fromEnv()

import { createClient } from 'redis';

const redis = createClient({
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as number|undefined,
    },
});

// console log if connection is successful
redis.on('connect', () => console.log('Redis Client Connected'));

redis.on('error', err => console.log('Redis Client Error', err));

if (!redis.isOpen) {
await redis.connect();
}

// disconnect redis client on exit
process.on('exit', () => {
    redis.disconnect();
    console.log('Redis Client Disconnected');
});

export { redis };
