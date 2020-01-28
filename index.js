import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import routes from './api/routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

env.config();

app.use('/api/v1', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
