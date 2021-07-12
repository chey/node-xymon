#!/usr/bin/env node
const dotenv = require('dotenv');
const { readFileSync } = require('fs');
const { ArgumentParser } = require('argparse');
const debug = require('debug')('xymon');
const { Xymon } = require('.');

const { version } = require('../package.json');

dotenv.config();

const parser = new ArgumentParser({ add_help: false });

function to(val) {
  return parseInt(val, 10) * 1000;
}

function main() {
  parser.add_argument('--help', { help: 'Show this help message and exit', action: 'help' });
  parser.add_argument('--version', { help: 'Show program\'s version number and exit', action: 'version', version: `Xymon version ${version}.node.js` });
  parser.add_argument('--debug', { help: 'Enable debugging', action: 'store_true' });
  parser.add_argument('--output', {
    help: 'Choose output format', choices: ['text', 'json'], default: 'text', type: 'str',
  });
  parser.add_argument('--merge', { help: 'Merge the command line message text with the data provided on standard input', action: 'store_true' });
  parser.add_argument('--response', { help: 'Display response which is the default (here for backward compatibility)', action: 'store_true', default: true });
  parser.add_argument('--proxy', { help: 'Proxy to use when sending messages via HTTP' });
  parser.add_argument('--timeout', { help: 'Specifies the timeout for connecting to the Xymon server, in seconds (default is 5)', type: to, default: 5000 });
  parser.add_argument('recipient', {
    help: 'IP-address or hostname (default: localhost)', nargs: '?', metavar: 'RECIPIENT',
  });
  parser.add_argument('message', { help: 'Message to send, or "-" to read from stdin', metavar: 'DATA', type: 'str' });

  const args = parser.parse_args();

  if (args.message.length <= 0) { parser.print_help(); process.exit(1); }

  debug.enabled = args.debug;

  debug(`Output format will be '${args.output}'`);

  ['XYMONDHOST', 'XYMONDPORT'].forEach((e) => {
    debug(`env ${e} = ${process.env[e]}`);
  });

  const [
    host = process.env.XYMONDHOST || 'localhost',
    port = process.env.XMONDPORT || 1984,
  ] = args.recipient ? args.recipient.split(':') : [];

  debug(`Recipient listed as '${host}:${port}'`);

  if (!host || !port) {
    debug.enabled = true;
    debug('Invalid RECIPIENT defined');
    process.exit(2);
  }

  let msg = args.message;

  if (['-', '@'].includes(args.message[0]) || args.merge) {
    const si = readFileSync(0);
    msg = args.merge ? `${msg} ${si}` : si;
  }

  debug(`Standard protocol on port ${port}`);

  const xymon = new Xymon({ host, port, timeout: args.timeout })
    .on('lookup', (err, address, family) => { debug(`Will connect to address '${address ?? ''}' port ${port} (IPv${family ?? '?'})`); })
    .on('connect', () => { debug('Connection successfully established'); })
    .on('data', () => { debug(`Sent ${msg.length} bytes`); })
    .on('end', () => { debug(`Read ${xymon.bytesWritten} bytes`); })
    .on('close', () => { debug('Closing connection'); })
    .on('error', (e) => {
      debug.enabled = true;
      debug(`Could not ${e.syscall} to Xymon daemon@${e.address ?? ''}:${e.port ?? ''} (${e.code})`);
      process.exit(5);
    })
    .on('timeout', () => {
      debug.enabled = true;
      debug('Whoops ! Failed to send message (Timeout)');
      debug(`Recipient '${host}:${port}', timeout ${args.timeout / 1000}`);
      debug(`1st line: '${msg.split(' ').shift()}'`);
      xymon.destroy();
      process.exit(7);
    })
    .relay(msg, args.output)
    .pipe(process.stdout);
}

if (require.main === module) {
  main();
}

module.exports = { to, main };
