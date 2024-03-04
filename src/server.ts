import express from 'express';
import { config } from 'dotenv';
import ProcessManager from './util/processManager';

config();

const port = process.env.PORT || 5000;
const ledMatrixLocation = process.env.LED_MATRIX_LOCATION;

const app = express();
const processManager = new ProcessManager();

app.get('/', (req, res) => {
  res.send(`
<html>
  <body>
    <a href="/api/set-time">set time</a>
    <a href="/api/kill-all">Kill</a>
  </body>
</html>
`);
});

// API
app.get('/api/set-time', (req, res) => {
  (async () => {
    try {
      processManager.runProcess([
        `${ledMatrixLocation}/bin/modules/time_date/time_date.out`,
      ]);
      return { success: true };
    } catch (e) {
      console.error({ setTimeError: e });
      return { success: false, error: e };
    }
  })().then((v) => res.json(v));
});

app.get('/api/kill-all', (req, res) => {
  (async () => {
    try {
      processManager.killProcess();
      return { success: true };
    } catch (e) {
      console.error({ killAllError: e });
      return { success: false, error: e };
    }
  })().then((v) => res.json(v));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
