/* eslint-disable indent */

import redis from 'redis';
import response from '../../helpers/resHelp';

const portRedis = process.env.REDIS_URL || 6379;

const redisClient = redis.createClient(portRedis);

const cachedSearchTeams = (req, res, next) => {
    const { keyword } = req.query;
    redisClient.get(keyword, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 201, 'success', `All teams with the keyword '${keyword}' `, '', cachedData));
        } else {
            next();
        }
    });
};

const cachedSearchFixtures = (req, res, next) => {
    const { keyword } = req.query;
    redisClient.get(keyword, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 201, 'success', `All fixtures with the keyword '${keyword}' `, '', cachedData));
        } else {
            next();
        }
    });
};

const cachedReadFixture = (req, res, next) => {
    const { id } = req.params;
    redisClient.get(id, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 200, 'success', 'Fixture retrieved successfully', '', cachedData));
        } else {
            next();
        }
    });
};


const cachedReadFixtures = (req, res, next) => {
    const { status } = req.query;
    if (status) {
        return redisClient.get(status, (error, cachedData) => {
            if (error) throw error;
            if (cachedData != null) {
                res.send(response(res, 200, 'success', ` ${status} fixtures retrieved successfully`, '', cachedData));
            } else {
                next();
            }
        });
    }

    redisClient.get('', (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 200, 'success', 'Fixture retrieved successfully', '', cachedData));
        } else {
            next();
        }
    });
};


const cachedReadTeam = (req, res, next) => {
    const { id } = req.params;
    redisClient.get(id, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 200, 'success', 'Team retrieved successfully', '', cachedData));
        } else {
            next();
        }
    });
};

const cachedReadTeams = (req, res, next) => {
    redisClient.get('', (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 200, 'success', 'Team retrieved successfully', '', cachedData));
        } else {
            next();
        }
    });
};

const cachedReadUser = (req, res, next) => {
    const { id } = req.params;
    redisClient.get(id, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 201, 'success', 'User found', '', cachedData));
        } else {
            next();
        }
    });
};

const cachedReadUsers = (req, res, next) => {
    redisClient.get('', (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            res.send(response(res, 201, 'success', 'User found', '', cachedData));
        } else {
            next();
        }
    });
};

export {
    cachedSearchTeams,
    cachedSearchFixtures,
    cachedReadFixture,
    cachedReadFixtures,
    cachedReadTeam,
    cachedReadTeams,
    cachedReadUser,
    cachedReadUsers,
};
