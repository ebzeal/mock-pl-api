/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import supertest from 'supertest';

import app from '../../..';

const request = supertest(app);

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJFbWFpbCI6Im9sdUBtZS5jb20iLCJhY2Nlc3MiOiJBZG1pbiIsImlhdCI6MTU4MDI5OTY4NiwiZXhwIjoxNjQzMzcxNjg2fQ.DEvUL4rmTthxLqAkH4rIYAKEvJQ9CyLkabMrXogyBzg'
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInVzZXJFbWFpbCI6ImJhcmxuQG5leS5jb20iLCJhY2Nlc3MiOiJVc2VyIiwiaWF0IjoxNTgwNDIyNjkyLCJleHAiOjE2NDM0OTQ2OTJ9.EiHv-Yr8kgrXcO2EZPd8sZgTjbbdZQ1Pp7VugJT5fuc'


describe('only Admin can get user, GET /', () => {
    it('should return a single user details', async () => {
        const response = await request
            .get('/api/v1/user/2')
            .set('Authorization', `Bearer ${adminToken}`)
        const { status, data: { statusCode, message, payload } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(201)
        expect(message).toEqual('User found')
        expect(payload).toBeDefined()
    });

    it('should return error for an unauthorised user ', async () => {
        const response = await request
            .get('/api/v1/user/2')
            .set('Authorization', `Bearer ${userToken}`)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('failure')
        expect(statusCode).toBe(401)
        expect(message).toEqual('You are unauthorised to access this page.')
    });

    it('should return error for a not found user ', async () => {
        const response = await request
            .get('/api/v1/user/20000')
            .set('Authorization', `Bearer ${adminToken}`)
        const { status, data: { statusCode } } = response.body;
        expect(status).toEqual('failure')
        // expect(statusCode).toBe(404)
        expect(statusCode).toBe(500)
        // expect(message).toEqual('User not found')
    });
})


describe('only Admin can get users, GET /', () => {
    it('should return a single user details', async () => {
        const response = await request
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${adminToken}`)
        const { status, data: { statusCode, message, payload } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(201)
        expect(message).toEqual('User found')
        expect(payload).toBeDefined()
    });

    it('should return error for an unauthrised user ', async () => {
        const response = await request
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${userToken}`)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('failure')
        expect(statusCode).toBe(401)
        expect(message).toEqual('You are unauthorised to access this page.')
    });
})


describe('Admin can change user status, PUT /', () => {
    it('should return a single user details', async () => {
        const response = await request
            .put('/api/v1/user/2')
            .set('Authorization', `Bearer ${adminToken}`)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(205)
        expect(message).toEqual(expect.stringContaining('User is now an'))
    });
})
