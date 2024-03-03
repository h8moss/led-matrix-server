import { spawn } from 'child_process';
import killProcess from './killProcess';
import { writeFile } from 'fs/promises';
import { processLocation } from '../constants';

const runProcessSudo = async (command: string[]) => {
  await killProcess();
  const childProcess = spawn('sudo', command);

  childProcess.stdout.setEncoding('utf8');
  childProcess.stdout.on('data', (stdout) => console.log({ stdout }));

  childProcess.stderr.setEncoding('utf8');
  childProcess.stderr.on('data', (stdout) => console.log({ stdout }));

  childProcess.on('close', (code) => {
    console.log({ command, code });
    killProcess();
  });

  const pid = childProcess.pid;
  console.log({ command, pid });

  if (pid === undefined) throw `Error running command ${command}`;
  await writeFile(processLocation, pid.toString());

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

/*
NOTE: THIS WORKED ONCE:
```
var spawn = require("child_process").spawn;
var path = require("path");

const myPath = path.resolve("led-matrix/rpi-rgb-led-matrix/examples-api-use/demo");

var child = spawn("sudo", [ myPath,"-D","7","--led-rows=64","--led-cols=64"]);

let output = "";

child.stdout.setEncoding("utf8");
child.stdout.on("data", function(data) {
        console.log("stdout: " + data);
        data = data.toString()
        output += data;
});

child.stderr.setEncoding("utf8");
child.stderr.on("data", function(data) {
        console.log("stderr: " + data)
        data = data.toString()
        output += data;
});

child.on("close", function(code) {
        console.log("Closing: " + code);
        console.log("OUTPUT: ")
        console.log(output)
});
```
*/
