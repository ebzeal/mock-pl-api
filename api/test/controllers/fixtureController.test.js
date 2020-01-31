/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import supertest from 'supertest';
import query from '../../config/dbConnection';

import app from '../../..';

const request = supertest(app);

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJFbWFpbCI6Im9sdUBtZS5jb20iLCJhY2Nlc3MiOiJBZG1pbiIsImlhdCI6MTU4MDI5OTY4NiwiZXhwIjoxNjQzMzcxNjg2fQ.DEvUL4rmTthxLqAkH4rIYAKEvJQ9CyLkabMrXogyBzg'
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInVzZXJFbWFpbCI6ImJhcmxuQG5leS5jb20iLCJhY2Nlc3MiOiJVc2VyIiwiaWF0IjoxNTgwNDIyNjkyLCJleHAiOjE2NDM0OTQ2OTJ9.EiHv-Yr8kgrXcO2EZPd8sZgTjbbdZQ1Pp7VugJT5fuc'

const insertFixture = {
    id: 56783935,
    homeTeam: 1,
    awayTeam: 2,
    matchOfficials: [
        {
            name: "Kampout Kilimbau",
            role: "Center Referee",
        },
        {
            name: "Kimiti Shouman",
            role: "lines Man",
        },
    ],
    matchDate: "2020-03-20",
    season: "2020",
    location: "punjab",
    status: "pending",
}

const newFixture = {
    homeTeam: 3,
    awayTeam: 1,
    matchOfficials: [
        {
            name: "Amtab Kambu",
            role: "Center Referee",
        },
        {
            name: "Anjira Manpour",
            role: "lines Man",
        },
    ],
    matchDate: "2020-03-20",
    status: "pending",
}

const updateData = {
    homeTeam: "3",
    awayTeam: "1",
    matchOfficials: [
        {
            name: "Amtabir Kambu",
            role: "Center Referee",
            uniqueId: "15708cab-3991-4a4b-8f1c-b0fbd332140b",
        },
        {
            name: "Anjira Manpour",
            role: "lines Man",
        },
    ],
    matchDate: "2019-10-15",
    season: "2020",
    status: "completed",

}

beforeAll(async () => {
    await query('INSERT INTO fixtures(id, homeTeam, awayTeam, matchDate, season, location, status)VALUES($1, $2, $3, $4, $5, $6, $7)', [insertFixture.id, insertFixture.homeTeam, insertFixture.awayTeam, insertFixture.matchDate, insertFixture.season, insertFixture.location, insertFixture.status]);
})

afterAll(async () => {
    await query('DELETE FROM fixtures WHERE homeTeam=$1 AND awayTeam=$2 AND matchDate=$3', [newFixture.homeTeam, newFixture.awayTeam, newFixture.matchDate]);
});

describe('only Admin can create a fixture, POST/', () => {
    it('should create new fixture', async () => {
        const response = await request
            .post('/api/v1/fixture')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newFixture)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(201)
        expect(message).toEqual('New Fixture has been added successfully')
    });
})


describe('Users can view fixture(s), GET/', () => {
    it('should return a single fixture', async () => {
        const response = await request
            .get('/api/v1/fixture/56783935')
            .set('Authorization', `Bearer ${userToken}`)
        const { status, data: { statusCode, message, payload } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(200)
        expect(message).toEqual('Fixture retrieved successfully')
        expect(payload).toBeDefined()
    });

    it('should return all fixtures', async () => {
        const response = await request
            .get('/api/v1/fixtures')
            .set('Authorization', `Bearer ${userToken}`)
        const { status, data: { statusCode, message, payload } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(200)
        expect(message).toEqual('Fixture retrieved successfully')
        expect(payload).toBeDefined()
    });
})


describe('Only Admin can update, toggle and delete fixtures', () => {
    it('should update a fixture', async () => {
        const response = await request
            .put('/api/v1/fixture/56783935')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updateData)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(200)
        expect(message).toEqual('Fixture updated successfully')
    });

    it('should toggle a fixture\'s status', async () => {
        const response = await request
            .put('/api/v1/fixture/complete/56783935')
            .set('Authorization', `Bearer ${adminToken}`)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(205)
        expect(message).toEqual(expect.stringContaining('Fixture is'))
    });

    it('should delete a fixture\'s status', async () => {
        const response = await request
            .delete('/api/v1/fixture/56783935')
            .set('Authorization', `Bearer ${adminToken}`)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(200)
        expect(message).toEqual('Fixture deleted successfully')
    });
})
