import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bhisa Tes',
      version: '1.0.0',
      description: 'A simple CRUD API with Express and Sequelize (SQLite)',
    },
    servers: [
      {
        url: 'https://backend-sqlite-express-production.up.railway.app',
      },
    ],
  },
  apis: ['./router/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
