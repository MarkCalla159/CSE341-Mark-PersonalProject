import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import booksRoutes from './routes/booksRoutes';
import swaggerRoutes from './routes/swaggerRoutes';
import connectdb from './database/connectdb';

const app = express();
const port = process.env.PORT || 8080;
// ✅ Use /books for the bookRoutes
app.use('/books', booksRoutes);

// ✅ Use /api-docs or similar for Swagger
app.use('/api-docs', swaggerRoutes);
app.use(bodyParser.json());
app.use('/', router);
app.use('/', swaggerRoutes);
// CORS headers middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

// Initialize DB then start server
connectdb.initDb((err: Error | null) => {
  if (err) {
    console.error('Failed to connect to DB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});