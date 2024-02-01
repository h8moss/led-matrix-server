import { spawn } from 'child_process';
import { writeFile } from 'fs/promises';
import { processLocation } from '../constants';
import killProcess from './killProcess';

const runProcessSudo = async (command: string) => {
  await killProcess();
  const childProcess = spawn('sudo ' + command);

  childProcess.stdout.on('data', (data) => {
    childProcess.stdin.write(process.env.PASSWORD + '\r\n');
    childProcess.stdin.end();
  });

  const pid = childProcess.pid;
  if (pid === undefined) throw `Error running command ${command}`;
  childProcess.disconnect();
  await writeFile(processLocation, pid.toString());
};

export default runProcessSudo;
