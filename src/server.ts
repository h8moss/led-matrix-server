import express from 'express';
import { config } from 'dotenv';
import runProcessSudo from './util/runProcessSudo';
import killProcess from './util/killProcess';

config();

const port = process.env.PORT || 5000;
const ledMatrixLocation = process.env.LED_MATRIX_LOCATION;

const app = express();

app.get('/', (req, res) => {
  res.send(
    `<html><body><a href="/api/set-time">set time</a><a href="/api/kill-all">Kill</a></body></html>`
  );
});

// API
app.get('/api/set-time', (req, res) => {
  (async () => {
    try {
      await runProcessSudo(app, [
        `${ledMatrixLocation}/bin/modules/time-date/time_date.out`,
      ]);
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  })().then((v) => res.json(v));
});

app.get('/api/kill-all', (req, res) => {
  (async () => {
    try {
      await killProcess(app);
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
