import express from 'express';
import { config } from 'dotenv';
import runProcessSudo from './util/runProcessSudo';

config();

const port = process.env.PORT || 5000;
const ledMatrixLocation = process.env.LED_MATRIX_LOCATION;

const app = express();

app.get('/', (req, res) => {
  res.send(`<html><body><a href="/api/set-time">set time</a></body></html>`);
});

// API
app.get('/api/set-time', (req, res) => {
  (async () => {
    try {
      await runProcessSudo([
        `${ledMatrixLocation}/bin/modules/time-date/time_date.out`,
      ]);
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  })().then((v) => res.json(v));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
