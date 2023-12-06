import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';

import { connectDB } from './db/mongoConnection.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middleware/notFoundMiddleware.js';

// routers
import authRouter from './routers/authRouter.js';
import articleRouter from './routers/articleRouter.js';
import commentaryRouter from './routers/commentaryRouter.js';

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
const v1 = '/api/v1';

app.get('/', (req, res) => {
  res.send('Syzyy API main endpoint!');
});

app.use(`${v1}/auth`, authRouter);
app.use(`${v1}/article`, articleRouter);
app.use(`${v1}/commentary`, commentaryRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// server start
const start = async () => {
  try {
    const dbConnection = await connectDB(process.env.MONGO_URI);
    console.log(
      `Connected to DB on '${dbConnection.connection.name}' collection...`
    );

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`API listening to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
