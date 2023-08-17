import express from 'express';
import 'dotenv/config';

import { connectDB } from './db/mongoConnection.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Syzyy API main endpoint!');
});

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
