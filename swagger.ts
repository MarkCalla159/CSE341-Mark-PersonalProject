const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config();

const isDev = process.env.NODE_ENV !== 'production';

const doc = {
  info: {
    title: 'Book Library API',
    description: 'API for managing a book library',
  },
  host: isDev ? `localhost:${process.env.PORT}` : 'cse341-mark-personalproject.onrender.com',
  schemes: isDev ? ['http'] : ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./dist/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);