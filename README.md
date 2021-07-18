# Xymon

Xymon client written in NodeJS.

A drop in replacement for the original Xymon client (cli) with some added features.

![Xymon view](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Xymon.png/320px-Xymon.png)

## Getting Started

Clone repo

### NPM
```
npm i -g .
xymon ping
xymon --help
```

### Docker
```
docker build -t xymon .
docker run --rm xymon host.docker.internal ping
```
Replace `host.docker.internal` with the address of your Xymon server/daemon (Xymond).

## Additional Features
* Installable anywhere Node.js or Docker resides
* Support for ENV variables (XYMONDHOST, XYMONDPORT)
* JSON output support


## Known discrepancies
* `--proxy` arg does nothing (only there for backward compatibility)
* URL not supported
* 0.0.0.0 RECIPIENT not supported

## Notes

### Dropping and Renaming
In order for `drop` and `rename` commands to work the server needs to be configured to allow the sending IP.

See the `--admin-senders=` configuration within the [Xymond documentaton](https://www.xymon.com/help/manpages/man8/xymond.8.html) for additional information.


## References
* https://www.xymon.com/help/manpages/man1/xymon.1.html

### Original Xymon client help message
```
Usage: xymon [--debug] [--merge] [--proxy=http://ip.of.the.proxy:port/] [RECIPIENT] "DATA"
  RECIPIENT: IP-address, hostname or URL (default: localhost)
  DATA: Message to send, or "-" to read from stdin
```
