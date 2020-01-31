/* eslint-disable indent */

import redis from 'redis';
import response from '../../helpers/resHelp';

const portRedis = process.env.REDIS_URL || 6379;

const redisClient = redis.createClient(portRedis);

const cacheReadFixture = (req, res, next) => {
    const { id } = req.params;
    redisClient.get(id, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 201, 'success', `All fixtures with the keyword '${id}' `, '', cachedData));
        } else {
            next();
        }
    });
};


const cacheReadFixtures = (req, res, next) => {
    const { id } = req.params;
    redisClient.get(id, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 201, 'success', `All fixtures with the keyword '${id}' `, '', cachedData));
        } else {
            next();
        }
    });
};

export {
    cacheReadFixture,
    cacheReadFixtures,
};
