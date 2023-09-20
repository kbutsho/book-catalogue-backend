import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/signup', validateRequest(userValidation.create), authController.signup);
router.post('/signin', validateRequest(userValidation.login), authController.login);

export const AuthRoute = router;
