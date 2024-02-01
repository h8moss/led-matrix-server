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
  try {
    // await runProcessSudo(`${ledMatrixLocation}/bin/date-time/date_time.out`);
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
