import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
// import { Profile } from './router/profile';
// import data from "./database/data.json";
import db from './config/connection';
 
dotenv.config();
const app = express();
const SECRET_KEY =  process.env.SECRET_KEY 
const PORT =  process.env.PORT 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
 
// const routeProfile = new Profile(express,SECRET_KEY); 
app.use(bodyParser.json()); 
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/profile',routeProfile.getRouter()); 

(async () => {
  await db.syncModels(); // Create table if not exists
  app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
  });
})();