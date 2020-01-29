/* eslint-disable max-len */
import tokenHelp from '../helpers/tokenHelp';
import query from '../config/dbConnection';
import passwordHelp from '../helpers/passwordHelp';
import response from '../helpers/resHelp';
import utils from '../helpers/utilsHelp';
import { checkUser, checkUserName, insertUser, findUser } from '../models/sqlQueries';

/**
 * @class authController
 */
class authController {
  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} A JSON Response object
   * @memberof authController
   */
  static async signUp(req, res) {
    try {
      const inputObj = utils.cleanInput(req.body);

      const { fullName, userName, email } = inputObj;

      const { rows } = await query(checkUser, [email]);
      let result = await query(checkUserName, [userName]);
      result = result.rows;
      if (rows[0]) {
        return response(res, 400, 'failure', 'This user already exists');
      }
      if (result[0]) {
        return response(res, 400, 'failure', 'This username already exists');
      }

      const hashedPassword = await passwordHelp.hashPassword(req.body.password);
      const userDetails = [fullName, userName, email, hashedPassword];

      const newUser = await query(insertUser, userDetails);
      const createdUser = newUser.rows[0];

      const payload = {
        userId: createdUser.id,
        userName: createdUser.userName,
        userEmail: createdUser.email,
        access: createdUser.access,
      };

      const token = await tokenHelp.sign(payload, '730d');

      return response(res, 201, 'success', 'Account created successfully', '', token);
    } catch (err) {
      return response(res, 500, 'failure', '', err.message);
    }
  }

  /**
   * @static
   * @param {*} req Request
   * @param {*} res Response
   * @returns {object} Json response
   * @memberof authController
   */
  static async logIn(req, res) {
    try {
      const inputObj = utils.cleanInput(req.body);

      const { user } = inputObj;

      const { rows } = await query(findUser, [user]);
      const foundUser = rows[0];

      if (!foundUser) {
        return response(res, 404, 'failure', 'Your login information is not correct');
      }
      const isValidPassword = passwordHelp.verifyPassword(req.body.password, foundUser.password);

      if (!isValidPassword) {
        return response(res, 401, 'failure', 'Your login information is not correct');
      }

      const payload = {
        userId: foundUser.id,
        userName: foundUser.userName,
        userEmail: foundUser.email,
        access: foundUser.access,
      };

      const token = tokenHelp.sign(payload);
      return response(res, 200, 'success', 'You have successfully logged in', '', token);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default authController;
