import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.get('/', CategoryController.getAllCategory);
router.post('/create-category', auth(ENUM_USER_ROLE.admin), validateRequest(CategoryValidation.createCategory), CategoryController.createCategory);
router.get('/:id', CategoryController.categoryById);
router.patch('/:id', auth(ENUM_USER_ROLE.admin), CategoryController.updateCategory);
router.delete('/:id', auth(ENUM_USER_ROLE.admin), CategoryController.deleteCategory);

export const categoryRoutes = router;
