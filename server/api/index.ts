import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index';
import errorMiddleware from './middlewares/error-middleware';
import http from 'http';


dotenv.config()
const PORT: number = Number(process.env.PORT) || 5000;
const app: Express = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL as string);
      server.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
   } catch (e) {
      console.error(e);
   }
};

start();