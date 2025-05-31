import type { Book } from '../interfaces/books';


export const validateBook = (book: Book): string[] => {
  const errors: string[] = [];

  if (!book.title || typeof book.title !== 'string') errors.push('Title is required and must be a string');
  if (!book.author || typeof book.author !== 'string') errors.push('Author is required and must be a string');
  if (!book.genre || typeof book.genre !== 'string') errors.push('Genre is required and must be a string');
  if (!book.publishedYear || typeof book.publishedYear !== 'number') errors.push('Published year must be a number');
  if (!book.summary || typeof book.summary !== 'string') errors.push('Summary is required and must be a string');
  if (!book.pages || typeof book.pages !== 'number') errors.push('Pages must be a number');
  if (!book.publisher || typeof book.publisher !== 'string') errors.push('Publisher is required and must be a string');

  return errors;
};