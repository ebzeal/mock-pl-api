/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import supertest from 'supertest';

import app from '../../..';

const request = supertest(app);


describe('Guests can search teams and fixture, POST/', () => {
    it('should search Team', async () => {
        const response = await request
            .get('/api/v1/search/teams?keyword=mar')
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(201)
        expect(message).toEqual(expect.stringContaining('All teams with the keyword '))
    });

    it('should search Fixtures', async () => {
        const response = await request
            .get('/api/v1/search/fixtures?keyword=pun')
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(201)
        expect(message).toEqual(expect.stringContaining('All fixtures with the keyword '))
    });
})
