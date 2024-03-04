import { stat, readFile } from 'fs/promises';
import { processLocation } from '../constants';

const killProcess = async () => {
  try {
    await stat(processLocation);
  } catch {
    return;
  }

  const pidString = await readFile(processLocation);
  console.log(`Killing ${pidString} (${pidString.join('').trim()})`);
  try {
    process.kill(Number.parseInt(pidString.join('').trim()));
  } catch (e) {
    console.error(e);
  }
};

export default killProcess;
