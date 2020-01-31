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

const insertTeam = {
    id: 56783935,
    name: "Delhi FC",
    location: "Delhii",
    coach: "Mymam Laypor",
    image: "image",
    players: [
        {
            playerName: "Mhu Joumpa",
            playerPosition: "Goal Keeper",
            playerNumber: 1,
        },
        {
            playerName: "Maman Mansour",
            playerPosition: "Forward",
            playerNumber: 9,
        },
        {
            playerName: "Higobert Boutal",
            playerPosition: "Defense",
            playerNumber: 2,
        },
    ],
}

const newTeam = {
    name: "Chennai FC",
    location: "Chennai",
    coach: "Maresh Kishan",
    image: "image",
    players: [
        {
            playerName: "Maki Hamuna",
            playerPosition: "Goal Keeper",
            playerNumber: 1,
        },
        {
            playerName: "Epal Kapor",
            playerPosition: "Forward",
            playerNumber: 9,
        },
        {
            playerName: "Malil Malik",
            playerPosition: "Defense",
            playerNumber: 2,
        },
    ],
}

const updateData = {
    id: 56783935,
    name: "Chennai Mules",
    location: "Chennai",
    coach: "Paspan Kameni",
    image: "image",
    players: [
        {
            playerName: "Moshe Hamuna",
            playerPosition: "Goal Keeper",
            playerNumber: 1,
            uniqueId: "3d820430-9ea3-410e-9755-ff86ec42f64d",
        },
        {
            playerName: "Ereish Kumpar",
            playerPosition: "Forward",
            playerNumber: 9,
            uniqueId: "0e112bc4-0b5c-43dc-9ef9-1cf9692399f2",
        },
    ],
}

beforeAll(async () => {
    await query('INSERT INTO teams(id, name, location, coach)VALUES($1, $2, $3, $4)', [insertTeam.id, insertTeam.name, insertTeam.location, insertTeam.coach]);
})

afterAll(async () => {
    await query('DELETE FROM teams WHERE name=$1 AND location=$2 AND coach=$3', [newTeam.name, newTeam.location, newTeam.coach]);
});

describe('only Admin can create a Team, POST/', () => {
    it('should create new Team', async () => {
        const response = await request
            .post('/api/v1/team')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newTeam)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(201)
        expect(message).toEqual('New Team has been added successfully')
    });
})


describe('Users can view Team(s), GET/', () => {
    it('should return a single Team', async () => {
        const response = await request
            .get('/api/v1/team/2')
            .set('Authorization', `Bearer ${userToken}`)
        const { status, data: { statusCode, message, payload } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(200)
        expect(message).toEqual('Team retrieved successfully')
        expect(payload).toBeDefined()
    });

    it('should return all Teams', async () => {
        const response = await request
            .get('/api/v1/teams')
            .set('Authorization', `Bearer ${userToken}`)
        const { status, data: { statusCode, message, payload } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(200)
        expect(message).toEqual('Team retrieved successfully')
        expect(payload).toBeDefined()
    });
})


describe('Only Admin can update and delete Teams', () => {
    it('should update a Team', async () => {
        const response = await request
            .put('/api/v1/team/2')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updateData)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(200)
        expect(message).toEqual('Team updated successfully')
    });


    it('should delete a Team\'s status', async () => {
        const response = await request
            .delete('/api/v1/team/56783935')
            .set('Authorization', `Bearer ${adminToken}`)
        const { status, data: { statusCode, message } } = response.body;
        expect(status).toEqual('success')
        expect(statusCode).toBe(200)
        expect(message).toEqual('Team deleted successfully')
    });
})
