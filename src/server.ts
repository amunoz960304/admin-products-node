import express from 'express';
import swaggerUI from 'swagger-ui-express';
import productsRouter from './routes/productsRouter';
import cors from 'cors';
import morgan from 'morgan';
import db from './config/db';
import swaggerSpec from './config/swagger';

async function initDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log('Conexion exitosa a la bd');
  } catch (error) {
    console.error(error);
  }
}

initDB();

const server = express();

const options: cors.CorsOptions = {
  origin: [process.env.FRONTEND_URL!],
};

server.use(cors(options));
server.use(express.json());
server.use(morgan('dev'));
server.use('/api/v1/products', productsRouter);
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
