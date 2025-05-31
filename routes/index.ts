import express from 'express';
import swaggerRoutes from './swaggerRoutes';
import booksRoutes from './booksRoutes';

const router = express.Router();

// Mount swagger routes at '/'
//router.use('/', swaggerRoutes);

// Mount contacts routes at '/contacts'
router.use('/books', booksRoutes);

export default router;