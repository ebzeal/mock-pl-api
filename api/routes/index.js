import { Router } from 'express';

import authController from '../controllers/authController';
import userController from '../controllers/userController';
import { signUpSchema, logInSchema } from '../middlewares/validations/authValidations';
import accessMiddleware from '../middlewares/accessMiddleware';
import handleValidationErrors from '../middlewares/validations/handleValidationErrors';

const route = Router();

route.get('/', (req, res) => {
  res.status(200).json('Welcome to Mock Premier League Fixtures');
});

route.post('/auth/signup', signUpSchema, handleValidationErrors, authController.signUp);
route.post('/auth/login', logInSchema, handleValidationErrors, authController.logIn);

route.get('/user/:id', accessMiddleware.authoriseUser, accessMiddleware.adminAccess, userController.getUser);
route.get('/users', accessMiddleware.authoriseUser, accessMiddleware.adminAccess, userController.getUsers);
route.put('/user/:id', accessMiddleware.authoriseUser, accessMiddleware.adminAccess, userController.makeAdmin);

export default route;
