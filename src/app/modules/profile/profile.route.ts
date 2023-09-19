import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from './../../../enums/user';
import { userController } from '../user/user.controller';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.admin, ENUM_USER_ROLE.customer), userController.profileInfo);

export const profileRoutes = router;
