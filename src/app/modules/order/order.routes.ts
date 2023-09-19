import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';
import { orderValidation } from './order.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post('/create-order', auth(ENUM_USER_ROLE.customer), validateRequest(orderValidation.orderSchema), OrderController.createOrder);
router.get('/', auth(ENUM_USER_ROLE.admin, ENUM_USER_ROLE.customer), OrderController.getAllOrder);
router.get('/:orderId', auth(ENUM_USER_ROLE.admin, ENUM_USER_ROLE.customer), OrderController.getSingleOrder);

export const orderRoutes = router;
