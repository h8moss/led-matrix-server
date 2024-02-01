import { spawn } from 'child_process';
import { writeFile } from 'fs/promises';
import { processLocation } from '../constants';
import killProcess from './killProcess';

const runProcess = async (command: string) => {
  await killProcess();
  const process = spawn(command);
  const pid = process.pid;
  if (pid === undefined) throw `Error running command ${command}`;
  process.disconnect();
  await writeFile(processLocation, pid.toString());
};

export default runProcess;
