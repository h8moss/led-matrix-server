import { type ChildProcessWithoutNullStreams, spawn } from 'child_process';

class ProcessManager {
  currentProcess: ChildProcessWithoutNullStreams | null = null;

  constructor() {}

  runProcess = (command: string[]) => {
    this.killProcess();

    this.currentProcess = spawn('sudo', command);

    this.currentProcess.stdout.setEncoding('utf8');
    this.currentProcess.stdout.on('data', (stdout) => console.log({ stdout }));

    this.currentProcess.stderr.setEncoding('utf8');
    this.currentProcess.stderr.on('data', (stdout) => console.log({ stdout }));

    this.currentProcess.on('close', (code) => {
      console.log({ command, code, closed: true });
      this.killProcess();
    });
  };

  killProcess = () => {
    console.log({
      currentProcess: this.currentProcess,
      killed: this.currentProcess?.killed,
    });
    if (this.currentProcess !== null && this.currentProcess.pid) {
      console.log({
        killResult: this.currentProcess.kill('SIGTERM'),
      });
      this.currentProcess = null;
    }
  };
}

export default ProcessManager;
