import express from 'express';
import cors from 'cors';
import env from 'dotenv';
// import redis from 'redis';
import routes from './api/routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

env.config();

// const portRedis = process.env.PORT || 6379;
const port = process.env.PORT || 5000;

// const redisClient = redis.createClient(portRedis);

app.use('/api/v1', routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}


export default app;
