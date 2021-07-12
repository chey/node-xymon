const net = require('net');
const csv = require('csvtojson');
const { Transform } = require('stream');
const c = require('./constants');
const { Parser } = require('./parser');

class Xymon extends net.Socket {
  constructor({ host = 'localhost', port = 1984, timeout = 5000 } = {}) {
    super();
    this.host = host;
    this.port = port;
    this.timeout = timeout;
    this.setTimeout(timeout);
  }

  relay(message, output = 'text') {
    this.connect(this, () => {
      // clientlog coming in from stdin needs junk trimmed from the end for some reason
      if (Parser.msg(message).is(c.XYMOND_CLIENTLOG_COMMAND)) {
        this.end(message.toString().trim());
      } else {
        this.end(message);
      }
    });

    if (output === 'json') {
      return this.outputJson(Parser.getCsvParams(message));
    }

    return this;
  }

  outputJson(params = {}) {
    // https://github.com/Keyang/node-csvtojson/issues/333
    const lineToArray = new Transform({
      transform(chunk, encoding, cb) {
        // add [ to very front
        // add , between rows
        // remove crlf from row
        this.push((this.isNotAtFirstRow ? ',' : '[') + chunk.toString('utf8').slice(0, -1));
        this.isNotAtFirstRow = true;
        cb();
      },
      flush(cb) {
        // add ] to very end or [] if no rows
        const isEmpty = (!this.isNotAtFirstRow);
        this.push(isEmpty ? '[]' : ']');
        cb();
      },
    });

    if (params.properArray) {
      return this.pipe(csv(params)).pipe(lineToArray);
    }

    return this.pipe(csv(params));
  }
}

module.exports = { Xymon };
