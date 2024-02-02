import { spawn } from 'child_process';
import { writeFile } from 'fs/promises';
import { processLocation } from '../constants';
import killProcess from './killProcess';

const runProcessSudo = async (command: string[]) => {
  await killProcess();
  const childProcess = spawn('sudo', command);

  childProcess.stdout.setEncoding('utf-8');
  childProcess.stdout.on('data', (data) => {
    childProcess.stdin.write(process.env.PASSWORD + '\r\n');
    childProcess.stdin.end();
  });
  childProcess.on('disconnect', () =>
    console.log({ command, event: 'disconnect' })
  );
  childProcess.on('close', () => console.log({ command, event: 'close' }));
  childProcess.on('error', () => console.log({ command, event: 'error' }));
  childProcess.on('exit', () => console.log({ command, event: 'exit' }));

  const pid = childProcess.pid;
  console.log({ command, pid });

  if (pid === undefined) throw `Error running command ${command}`;
  await writeFile(processLocation, pid.toString());
};

export default runProcessSudo;
