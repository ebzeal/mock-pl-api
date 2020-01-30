import { Router } from 'express';

import authController from '../controllers/authController';
import userController from '../controllers/userController';
import teamController from '../controllers/teamController';

import { signUpSchema, logInSchema } from '../middlewares/validations/authValidations';
import handleValidationErrors from '../middlewares/validations/handleValidationErrors';
import teamSchema from '../middlewares/validations/teamValidations';

import accessMiddleware from '../middlewares/accessMiddleware';

const route = Router();

route.get('/', (req, res) => {
  res.status(200).json('Welcome to Mock Premier League Fixtures');
});

route.post('/auth/signup', signUpSchema, handleValidationErrors, authController.signUp);
route.post('/auth/login', logInSchema, handleValidationErrors, authController.logIn);

route.get('/user/:id', accessMiddleware.authoriseUser, accessMiddleware.adminAccess, userController.getUser);
route.get('/users', accessMiddleware.authoriseUser, accessMiddleware.adminAccess, userController.getUsers);
route.put('/user/:id', accessMiddleware.authoriseUser, accessMiddleware.adminAccess, userController.makeAdmin);

route.post(
  '/team',
  accessMiddleware.authoriseUser,
  accessMiddleware.adminAccess,
  teamSchema,
  handleValidationErrors,
  teamController.addTeam,
);
route.get('/teams', accessMiddleware.authoriseUser, teamController.readTeams);
route.get('/team/:id', accessMiddleware.authoriseUser, teamController.readTeam);
route.put(
  '/team/:id',
  accessMiddleware.authoriseUser,
  accessMiddleware.adminAccess,
  teamSchema,
  handleValidationErrors,
  teamController.updateTeam,
);
route.delete('/team/:id', accessMiddleware.authoriseUser, accessMiddleware.adminAccess, teamController.deleteTeam);


export default route;
