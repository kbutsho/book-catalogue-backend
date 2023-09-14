import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from './../../../enums/user';
import { userController } from './user.controller';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.geAllUser);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.getSingleUser);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.updateUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser);

export const userRoutes = router;