import express from 'express';
import swaggerRoutes from './swaggerRoutes';
import booksRoutes from './booksRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

// Mount books routes at '/books'
router.use('/books', booksRoutes);
// Mount swagger routes at '/'
router.use('/api-docs', swaggerRoutes);
//OAuth
router.use('/', authRoutes);
export default router;