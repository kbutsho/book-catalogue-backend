import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { bookValidation } from './book.validations';

const router = express.Router();

router.get('/', BookController.getAllBook);
router.post('/create-book', auth(ENUM_USER_ROLE.admin), validateRequest(bookValidation.createBook), BookController.createBook);
router.get('/category/:categoryId', BookController.gateBooksByCategoryId);
router.get('/:id', BookController.getBookById);
router.patch('/:id', auth(ENUM_USER_ROLE.admin), validateRequest(bookValidation.updateBook), BookController.updateBook);
router.delete('/:id', auth(ENUM_USER_ROLE.admin), BookController.deleteBook);

export const bookRoutes = router;
