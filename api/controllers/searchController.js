import query from '../config/dbConnection';
import {
  getSearchTeam,
  getSearchPlayers,
  getSearchFixtures,
  getSearchOfficials,
} from '../models/sqlQueries';
import response from '../helpers/resHelp';


/**
 * @class searchController
 * @description handles all team operations
 */
class searchController {
  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof searchController
   */
  static async searchTeam(req, res) {
    try {
      const { keyword } = req.query;

      const searchTeams = await query(getSearchTeam, [keyword]);
      const searchPlayers = await query(getSearchPlayers, [keyword]);

      const searchResult = { Teams: [searchTeams.rows], Players: [searchPlayers.rows] };
      return (searchTeams.rowCount > 0 || searchPlayers.rowCount > 0)
        ? response(res, 201, 'success', `All teams with the keyword '${keyword}' `, '', searchResult)
        : response(res, 404, 'failure', 'No Search found', '');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }


  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof searchController
   */
  static async searchFixture(req, res) {
    try {
      const { keyword } = req.query;

      const searchFixture = await query(getSearchFixtures, [keyword]);
      const searchOfficials = await query(getSearchOfficials, [keyword]);

      const searchResult = { Fixtures: [searchFixture.rows], Officials: [searchOfficials.rows] };
      return (searchFixture.rowCount > 0 || searchOfficials.rowCount > 0)
        ? response(res, 201, 'success', `All teams with the keyword '${keyword}' `, '', searchResult)
        : response(res, 404, 'failure', 'No Search found', '');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }
}

export default searchController;
