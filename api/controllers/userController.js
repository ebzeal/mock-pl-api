/* eslint-disable max-len */
import query from '../config/dbConnection';
import response from '../helpers/resHelp';
import { findUserById, findUsers, updateUser } from '../models/sqlQueries';

/**
 * @class userController
 */
class userController {
  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof userController
   */
  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await query(findUserById, [id]);
      const foundUser = rows[0];
      delete foundUser.password;

      return foundUser
        ? response(res, 201, 'success', 'User found', '', foundUser)
        : response(res, 404, 'failure', 'User not found');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof userController
   */
  static async getUsers(req, res) {
    try {
      const { rows } = await query(findUsers);
      let foundUsers = rows;

      foundUsers = foundUsers.map((foundUser) => {
        delete foundUser.password;
        return foundUser;
      });

      return foundUsers
        ? response(res, 201, 'success', 'User found', '', foundUsers)
        : response(res, 404, 'failure', 'User not found');
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof Auth
   */
  static async toggleUserAccess(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await query(findUserById, [id]);
      const foundUser = rows[0];
      if (!foundUser) return response(res, 404, 'failures', 'User not found');

      const newStatus = foundUser.access === 'User' ? 'Admin' : 'User';
      const result = await query(updateUser, [id, newStatus]);
      const grantAdminAccess = result.rowCount;

      if (grantAdminAccess) return response(res, 205, 'success', `User is now an ${newStatus}`);
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }
}

export default userController;
