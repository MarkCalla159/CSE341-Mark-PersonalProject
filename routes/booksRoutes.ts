import express from 'express';

import bookController from '../controllers/bookController';

const router = express.Router();

// Get all books
router.get('/', bookController.getAllBooks);

// Get single book by ID
router.get('/:id', bookController.getBookById);

// Create a new book
router.post('/', bookController.createBook);

// Update a book by ID
router.put('/:id', bookController.updateBook);

// Delete a book by ID
router.delete('/:id', bookController.deleteBook);

export default router;