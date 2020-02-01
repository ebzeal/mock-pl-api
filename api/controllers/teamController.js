import redis from 'redis';
import { uuid } from 'uuidv4';
import query from '../config/dbConnection';
import {
  findTeam,
  findTeams,
  addTeam,
  findTeamById,
  updateTeam,
  addPlayers,
  getTeamWithPlayers,
  updatePlayers,
  deleteTeam,
} from '../models/sqlQueries';
import response from '../helpers/resHelp';

const portRedis = process.env.REDIS_URI || 6379;

// const redisClient = redis.createClient(portRedis);
const redisClient = redis.createClient({ host: 'redis', port: portRedis });


/**
 * @class teamController
 * @description handles all team operations
 */
class teamController {
  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof teamController
   */
  static async addTeam(req, res) {
    try {
      const {
        name, location, coach, players,
      } = req.body;
      const { rows } = await query(findTeam, [name]);
      if (rows[0]) return response(res, 409, 'failure', 'This team already exist');

      const teamDetails = [name, location, coach];
      const newTeam = await query(addTeam, teamDetails);

      let addedPlayers = false;

      if (newTeam.rowCount === 1) {
        let addedTeam = await query(findTeam, [name]);
        addedTeam = addedTeam.rows;
        const teamId = addedTeam[0].id;

        await players.map(async ({ playerName, playerPosition, playerNumber }) => {
          await query(addPlayers, [playerName, playerPosition, playerNumber, teamId]);
        });

        addedPlayers = true;
      }

      if (addedPlayers) return response(res, 201, 'success', 'New Team has been added successfully');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof teamController
   */
  static async readTeam(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await query(getTeamWithPlayers, [id]);
      if (rows.length < 1) {
        response(res, 404, 'failure', 'Team not found');
      }
      const foundTeam = {};
      foundTeam.name = rows[0].name;
      foundTeam.location = rows[0].location;
      foundTeam.coach = rows[0].coach;
      foundTeam.players = rows.map(({ playername, playerposition, playernumber }) => (
        {
          name: playername,
          position: playerposition,
          number: playernumber,
        }
      ));

      redisClient.setex(id, 3600, JSON.stringify(foundTeam));

      return foundTeam
        ? response(res, 200, 'success', 'Team retrieved successfully', '', foundTeam)
        : response(res, 404, 'failure', 'Team not found');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof teamController
   */
  static async readTeams(req, res) {
    try {
      const { rows } = await query(findTeams);
      if (rows.length < 1) {
        response(res, 404, 'failure', 'No teams found');
      }
      const foundTeam = rows;

      redisClient.setex('', 3600, JSON.stringify(foundTeam));

      return foundTeam
        ? response(res, 200, 'success', 'Team retrieved successfully', '', foundTeam)
        : response(res, 404, 'failure', 'Team not found');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }


  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof teamController
   */
  static async updateTeam(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await query(findTeamById, [id]);
      if (!rows[0]) return response(res, 409, 'failure', 'This team does not exist');

      const {
        name, location, coach, players,
      } = req.body;
      const updateATeam = await query(updateTeam, [id, name, location, coach]);


      if (updateATeam.rowCount === 1) {
        let updatedTeam = await query(findTeam, [name]);
        updatedTeam = updatedTeam.rows;
        const teamId = updatedTeam[0].id;

        await players.map(async ({
          uniqueId, playerName, playerPosition, playerNumber,
        }) => {
          const theId = uniqueId || uuid();
          await query(updatePlayers, [playerName, playerPosition, playerNumber, teamId, theId]);
        });
      }

      const teamUpdated = await query(getTeamWithPlayers, [id]);

      const foundTeam = {};
      foundTeam.name = teamUpdated.rows[0].name;
      foundTeam.location = teamUpdated.rows[0].location;
      foundTeam.coach = teamUpdated.rows[0].coach;
      foundTeam.players = teamUpdated.rows.map(({ playername, playerposition, playernumber }) => (
        {
          name: playername,
          position: playerposition,
          number: playernumber,
        }
      ));

      return foundTeam
        ? response(res, 200, 'success', 'Team updated successfully', foundTeam)
        : response(res, 404, 'failure', 'Team not updated');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof teamController
   */
  static async deleteTeam(req, res) {
    try {
      const { id } = req.params;
      const deleteATeam = await query(deleteTeam, [id]);
      return deleteATeam.rowCount === 1
        ? response(res, 200, 'success', 'Team deleted successfully')
        : response(res, 400, 'failure', 'Team does not exist');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }
}

export default teamController;
