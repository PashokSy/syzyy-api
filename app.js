import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Syzyy landing page!');
});

const port = 5000;
app.listen(port, () => {
  console.log(`API listening to port ${port}...`);
});
