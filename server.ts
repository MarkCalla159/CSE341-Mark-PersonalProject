import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import session from 'express-session';
import passport from './auth/passport';
import swaggerRoutes from './routes/swaggerRoutes';
import connectdb from './database/connectdb';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
//Routes
app.use('/auth', authRoutes);
app.use('/', swaggerRoutes);
app.use('/', router);
// Optional catch-all route or home route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to API');
});
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
//OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'b31f2f74c7df875d9d168726407af0feab4b08b3cc999b202ecce71ac84abd4bb531228ed0e280dfccd228eeda87c4118d239c61eb6a59405b225fc723807b93', 
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })

);
app.use(passport.initialize());
app.use(passport.session());


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