import { processLocation } from '../constants';
import type { Express } from 'express';
import type { ChildProcessWithoutNullStreams } from 'child_process';

const killProcess = async (app: Express) => {
  const currentProcess = app.locals
    .currentProcess as ChildProcessWithoutNullStreams | null;

  if (currentProcess && !currentProcess.killed) {
    currentProcess.kill();
  }
  app.locals.currentProcess = null;
};

export default killProcess;
