import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import connectdb from '../database/connectdb';

interface Book {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  summary: string;
  pages: number;
  publisher: string;
}
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
    const book: Book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      summary: req.body.summary,
      pages: req.body.pages,
      publisher: req.body.publisher,
    };
    const response = await connectdb.getDb().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
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
    const bookId = new ObjectId(req.params.id);
    const book: Book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      summary: req.body.summary,
      pages: req.body.pages,
      publisher: req.body.publisher,
    };
    const response = await connectdb.getDb().db().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Failed to update book' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid book ID or error updating book', error });
  }
};

/******************************************
 * Delete a Book
 *******************************************/
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await connectdb.getDb().db().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Failed to delete book' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid book ID or error deleting book', error });
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