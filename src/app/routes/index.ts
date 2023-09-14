import express from 'express';
import { AuthRoute } from '../modules/Auth/auth.router';
import { bookroutes } from '../modules/book/book.routes';
import { categoryroutes } from '../modules/category/category.routes';
import { orderroutes } from '../modules/order/order.routes';
import { userController } from '../modules/user/user.controller';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoute,
  },

  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryroutes,
  },
  {
    path: '/books',
    route: bookroutes,
  },
  {
    path: '/orders',
    route: orderroutes,
  },
  {
    path: '/profile',
    route: userController.profile,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
