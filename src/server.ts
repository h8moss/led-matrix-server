import express from "express";
import {stat, readFile} from 'fs/promises';
import {config} from 'dotenv';
import runProcess from "./util/runProcess";

config();

const port = process.env.PORT || 5000;
const ledMatrixLocation = process.env.LED_MATRIX_LOCATION;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

// API
app.post('/api/set-time', async (req, res) => {
  await runProcess(`sudo ${ledMatrixLocation}/bin/date-time/date_time.out`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});