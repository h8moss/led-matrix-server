import express from 'express';
import { config } from 'dotenv';
import runProcessSudo from './util/runProcessSudo';

config();

const port = process.env.PORT || 5000;
const ledMatrixLocation = process.env.LED_MATRIX_LOCATION;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

// API
app.get('/api/set-time', async (req, res) => {
  await runProcessSudo(`${ledMatrixLocation}/bin/date-time/date_time.out`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
