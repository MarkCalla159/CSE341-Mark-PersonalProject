import dotenv from 'dotenv';
import { MongoClient, Db } from 'mongodb';

dotenv.config();
console.log(process.env.API_KEY);

let _db: MongoClient;

const initDb = (callback: (err: Error | null, db?: MongoClient) => void): void => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return callback(new Error('MongoDB URI is not defined in environment variables'));
  }

  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = (): MongoClient => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

export default {
  initDb,
  getDb
};