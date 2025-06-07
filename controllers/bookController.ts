import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import connectdb from '../database/connectdb';

import { Book } from '../interfaces/books';
import { validateBook } from '../utilities/validateBook';
/* This will be add in models to validate UPDATE and CREATE
interface Book {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  summary: string;
  pages: number;
  publisher: string;
}*/
/******************************************
 * All Books
 *******************************************/
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await connectdb.getDb().db().collection('books').find();
    const books = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve books', error });
  }
};

/******************************************
 * Single Book
 *******************************************/
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await connectdb.getDb().db().collection('books').find({ _id: bookId });
    const books = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    if (books.length > 0) {
      res.status(200).json(books[0]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid book ID', error });
  }
};

/******************************************
 * Create a new Book
 *******************************************/
const createBook = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const errors = validateBook(req.body);
    if (errors.length > 0) {
      return void res.status(400).json({ message: 'Validation failed', errors });
    }

    const book: Book = req.body;
    const response = await connectdb.getDb().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Book created', bookId: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create book' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

/******************************************
 * Update a Book
 *******************************************/
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
 try {
    const bookId = req.params.id;

    // Validate ObjectId format
    if (!ObjectId.isValid(bookId)) {
      return void res.status(400).json({ message: 'Invalid book ID format' });
    }

    // Validate the request body
    const errors = validateBook(req.body);
    if (errors.length > 0) {
      return void res.status(400).json({ message: 'Validation failed', errors });
    }

    const updatedBook: Book = req.body;
    const response = await connectdb.getDb().db().collection('books').replaceOne(
      { _id: new ObjectId(bookId) },
      updatedBook
    );

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ message: 'Book not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

/******************************************
 * Delete a Book
 *******************************************/
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await connectdb.getDb().db().collection('books').deleteOne({ _id: new ObjectId(bookId) });
    if (!ObjectId.isValid(bookId)) {
      return void res.status(400).json({ message: 'Invalid book ID format' });
    } if (response.deletedCount === 0) {
      return void res.status(404).json({ message: 'Book not found' });
    }
      return void res.status(204).send(); // No content, success
  }
  catch (error) {
    return void res.status(500).json({ message: 'Error deleting book', error });
  }
};

const bookController = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};

export default bookController;