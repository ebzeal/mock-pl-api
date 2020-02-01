import { uuid } from 'uuidv4';
import redis from 'redis';

import query from '../config/dbConnection';
import {
  findFixture,
  getTeamLocation,
  findFixtureConflict,
  getTeamDetails,
  getTeamName,
  createFixture,
  addMatchOfficials,
  findFixtureById,
  getMatchOfficials,
  findAllFixtures,
  updateFixture,
  updateMatchOfficials,
  deleteFixture,
  updateFixtureStatus,
  getFixturesByStatus
} from '../models/sqlQueries';
import response from '../helpers/resHelp';


const portRedis = process.env.REDIS_URI || 6379;

const redisClient = redis.createClient({ host: 'redis', port: portRedis });

/**
 * @class fixtureController
 * @description handles all fixture operations
 */
class fixtureController {
  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof fixtureController
   */
  static async createFixture(req, res) {
    try {
      const { homeTeam, awayTeam, matchOfficials, matchDate, status } = req.body;
      const season = matchDate.toString().split(' ')[3];

      let location = await query(getTeamLocation, [homeTeam]);
      location = location.rows[0].location
      if (homeTeam === awayTeam) return response(res, 409, 'failure', 'Home team cannot be the same as away team');
      const { rows } = await query(findFixture, [homeTeam, awayTeam, season, location])

      if (rows[0]) return response(res, 409, 'failure', 'Fixture can only exist once in a season in the same location');

      const fixtureConflict = await query(findFixtureConflict, [matchDate, homeTeam, awayTeam])
      if (fixtureConflict.rowCount > 0) return response(res, 409, 'failure', 'A team cannot have two fixtures on the same day');

      let homeTeamName = await query(getTeamDetails, [homeTeam]);
      homeTeamName = homeTeamName.rows[0];
      let awayTeamName = await query(getTeamDetails, [awayTeam]);
      awayTeamName = awayTeamName.rows[0]
      const link = `${homeTeamName.name
        .split('')
        .slice(0, 3)
        .join('')}Vs${awayTeamName.name
          .split('')
          .slice(0, 3)
          .join('')}${homeTeamName.location}${season}`;

      let createdFixture = await query(createFixture, [homeTeam, awayTeam, matchDate, season, location, status]);
      if (createdFixture.rowCount > 0) {
        matchOfficials.map(async ({ name, role }) => {
          const { rows } = await query(findFixture, [homeTeam, awayTeam, season, location]);
          await query(addMatchOfficials, [name, role, rows[0].id]);
        });
        return response(res, 201, 'success', 'New Fixture has been added successfully');
      }

    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof fixtureController
   */
  static async readFixture(req, res) {
    try {
      const { id } = req.params;
      let returnedFixture = {};
      const { rows } = await query(findFixtureById, [id]);
      if (!rows[0]) return response(res, 404, 'failures', 'Fixture not found');

      const homeTeam = await query(getTeamName, [rows[0].hometeam]);
      const awayTeam = await query(getTeamName, [rows[0].awayteam]);

      let matchOfficials = await query(getMatchOfficials, [id]);
      matchOfficials = matchOfficials.rows.map(({ name, role }) => {
        return `${role}: ${name}`
      })

      returnedFixture = { ...rows[0], hometeam: homeTeam.rows[0].name, awayteam: awayTeam.rows[0].name, matchOfficials };

      redisClient.setex(id, 3600, JSON.stringify(returnedFixture));

      return response(res, 200, 'success', 'Fixture retrieved successfully', '', returnedFixture);
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
    * @static
    * @param {object} req - request object
    * @param {object} res - response object
    * @return {object} A JSON Response object
    * @memberof fixtureController
    */
  static async readFixtures(req, res) {
    try {

      const { status } = req.query;
      if (status) {
        const { rows } = await query(getFixturesByStatus, [status]);
        if (!rows[0]) return response(res, 404, 'failures', `No ${status} fixture`);

        returnedFixture = await Promise.all(rows.map(async row => {
          const homeTeam = await query(getTeamName, [row.hometeam]);
          const awayTeam = await query(getTeamName, [row.awayteam]);

          return { ...row, hometeam: homeTeam.rows[0].name, awayteam: awayTeam.rows[0].name };

        }));

        redisClient.setex(status, 3600, JSON.stringify(returnedFixture));

        return response(res, 200, 'success', ` ${status} fixtures retrieved successfully`, '', returnedFixture);

      }
      let returnedFixture = {};
      const { rows } = await query(findAllFixtures);
      if (!rows[0]) return response(res, 404, 'failures', 'Fixture not found');

      returnedFixture = await Promise.all(rows.map(async row => {
        const homeTeam = await query(getTeamName, [row.hometeam]);
        const awayTeam = await query(getTeamName, [row.awayteam]);

        return { ...row, hometeam: homeTeam.rows[0].name, awayteam: awayTeam.rows[0].name };

      }));

      redisClient.setex('', 3600, JSON.stringify(returnedFixture));

      return response(res, 200, 'success', 'Fixture retrieved successfully', '', returnedFixture);

    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof fixtureController
   */
  static async updateFixture(req, res) {
    try {
      const { id } = req.params;
      const { homeTeam, awayTeam, matchDate, season, status, matchOfficials } = req.body;
      let homeTeamName = await query(getTeamDetails, [homeTeam]);
      homeTeamName = homeTeamName.rows[0];
      let awayTeamName = await query(getTeamDetails, [awayTeam]);
      awayTeamName = awayTeamName.rows[0]
      const link = `${homeTeamName.name
        .split('')
        .slice(0, 3)
        .join('')}Vs${awayTeamName.name
          .split('')
          .slice(0, 3)
          .join('')}${homeTeamName.location}${season}`;
      let location = await query(getTeamLocation, [homeTeam]);
      location = location.rows[0].location

      const updatedFixture = await query(updateFixture, [homeTeam, awayTeam, matchDate, season, location, status, link, id]);
      if (updateFixture.rowCount > 0) {
        await matchOfficials.map(async ({ name, role, uniqueId }) => {
          const theId = uniqueId || uuid();
          return await query(updateMatchOfficials, ([name, role, theId]))
        })
      }

      return updatedFixture.rowCount > 0
        ? response(res, 200, 'success', 'Fixture updated successfully', '')
        : response(res, 404, 'failure', 'Fixture not updated');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof fixtureController
   */
  static async deleteFixture(req, res) {
    try {
      const { id } = req.params;
      const deleteAFixture = await query(deleteFixture, [id]);
      return deleteAFixture.rowCount === 1
        ? response(res, 200, 'success', 'Fixture deleted successfully')
        : response(res, 400, 'failure', 'Fixture does not exist');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof fixtureController
   */
  static async toggleFixtureStatus(req, res) {
    try {
      const { id } = req.params;
      const foundFixture = await query(findFixtureById, [id]);
      if (!foundFixture.rows[0]) return response(res, 404, 'failures', 'Fixture not found');
      const newStatus = foundFixture.rows[0].status === 'pending' ? 'completed' : 'pending'
      const completeFixture = await query(updateFixtureStatus, [id, newStatus])
      if (completeFixture.rowCount > 0) return response(res, 205, 'success', `Fixture is ${newStatus}`);
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }
}

export default fixtureController;
