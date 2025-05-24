const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book Library API',
    description: 'API for managing a book library',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./dist/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);