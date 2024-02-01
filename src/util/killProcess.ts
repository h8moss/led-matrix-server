import {stat, readFile} from 'fs/promises';
import {processLocation} from '../constants';

const killProcess = async () => {
  try {
    await stat(processLocation);
  } catch {
    return;
  }

  const pidString = await readFile(processLocation);
  process.kill(Number.parseInt(pidString.join('').trim()));
}

export default killProcess;