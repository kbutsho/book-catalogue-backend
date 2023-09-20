import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from './../../../enums/user';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.admin), userController.geAllUser);
router.get('/:id', auth(ENUM_USER_ROLE.admin), userController.getSingleUser);
router.patch('/:id', auth(ENUM_USER_ROLE.admin), validateRequest(userValidation.update), userController.updateUser);
router.delete('/:id', auth(ENUM_USER_ROLE.admin), userController.deleteUser);

export const userRoutes = router;
