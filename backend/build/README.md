Put here the led matrix server build

You can get the build from the release section from the github repository or build it running the following command from the above directory:

```bash
$ GOOS=<OS> GOARCH=<ARCH> [GOARM=<arm>] go build -o build/ .
```

For example, to build for the raspberry pi zero w running linux, which has an ARMv6 architecture, we would run:

```bash
$ GOOS=linux GOARCH=arm GOARM=6 go build -o build/ .
```

It is not recommended to build directly in the pi, as it isn't very powerful and it may take some time, instead
I recommend running this in your main computer and then using something like `scp` to pass the file into the pi

If you do end up building this from your pi, you need not specify the OS, ARCH or ARM, go is smart enough
to figure it out:

```bash
$ go build -o build/ .
```
