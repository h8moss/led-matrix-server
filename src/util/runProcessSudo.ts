import { spawn } from 'child_process';
import killProcess from './killProcess';

const runProcessSudo = async (command: string[]) => {
  await killProcess();
  const childProcess = spawn('sudo', command);

  childProcess.stdout.setEncoding('utf8');
  childProcess.stdout.on('data', (data) => {
    console.log('STDOUT: ' + data);
  });
  childProcess.stderr.setEncoding('utf8');
  childProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  childProcess.on('close', function (code) {
    //Here you can get the exit code of the script

    console.log('closing code: ' + code);
  });

  // childProcess.on('disconnect', () =>
  // console.log({ command, event: 'disconnect' })
  // );
  // childProcess.on('close', () => console.log({ command, event: 'close' }));
  // childProcess.on('error', () => console.log({ command, event: 'error' }));
  // childProcess.on('exit', () => console.log({ command, event: 'exit' }));

  // const pid = childProcess.pid;
  // console.log({ command, pid });

  // if (pid === undefined) throw `Error running command ${command}`;
  // await writeFile(processLocation, pid.toString());
};

export default runProcessSudo;
