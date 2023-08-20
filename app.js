import express from 'express';
import 'dotenv/config';
import 'express-async-errors';

import { connectDB } from './db/mongoConnection.js';

// routers
import signUpRouter from './routers/signUpRouter.js';
import signInRouter from './routers/signInRouter.js';

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Syzyy API main endpoint!');
});

app.use('/api/v1/auth', signUpRouter);
app.use('/api/v1/auth', signInRouter);

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
