import { spawn } from 'child_process';
import killProcess from './killProcess';
import { writeFile } from 'fs/promises';
import { processLocation } from '../constants';
import type { Express } from 'express';

const runProcessSudo = async (app: Express, command: string[]) => {
  await killProcess(app);
  const childProcess = spawn('sudo', command);
  app.locals.currentProcess = childProcess;

  childProcess.stdout.setEncoding('utf8');
  childProcess.stdout.on('data', (stdout) => console.log({ stdout }));

  childProcess.stderr.setEncoding('utf8');
  childProcess.stderr.on('data', (stdout) => console.log({ stdout }));

  childProcess.on('close', (code) => {
    console.log({ command, code });
    app.locals.currentProcess = null;
  });

  const pid = childProcess.pid;
  console.log({ command, pid });

  if (pid === undefined) throw `Error running command ${command}`;
};

export default runProcessSudo;
