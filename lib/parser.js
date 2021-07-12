const c = require('./constants');

class Parser {
  static msg(message) {
    const begin = message.slice(0, c.XYMON_CMD_MAXLEN).toString();
    return {
      is(command) {
        return begin.substring(0, command.length) === command;
      },
    };
  }

  static getCsvParams(message) {
    const pm = Parser.msg(message);
    let params = { ...c.XYMOND_DEFAULT_CSV_OPTS };

    switch (true) {
      case pm.is(c.XYMOND_BOARD_COMMAND):
        params = { ...c.XYMOND_MULTI_CSV_OPTS };
        params.headers = this.getBoardFields(message.toString());
        break;
      case pm.is(c.XYMOND_LOG_COMMAND):
        params = { ...c.XYMOND_LOG_CSV_OPTS };
        params.headers = { ...c.XYMOND_LOG_FIELDS };
        break;
      case pm.is(c.XYMOND_HOSTINFO_COMMAND):
        params = { ...c.XYMOND_MULTI_CSV_OPTS };
        params.headers = { ...c.XYMOND_HOSTINFO_FIELDS };
        break;
      case pm.is(c.XYMOND_SCHEDULE_COMMAND):
        params = { ...c.XYMOND_MULTI_CSV_OPTS };
        params.headers = { ...c.XYMOND_SCHEDULE_FIELDS };
        break;
      case pm.is(c.XYMOND_GHOST_COMMAND):
        params = { ...c.XYMOND_MULTI_CSV_OPTS };
        params.headers = { ...c.XYMOND_GHOST_FIELDS };
        break;
      case pm.is(c.XYMOND_CLIENTLOG_COMMAND):
        params = { ...c.XYMOND_CLIENTLOG_CSV_OPTS };
        break;
      default:
    }

    if ('downstreamFormat' in params && params.downstreamFormat === 'array') {
      delete params.downstreamFormat;
      params.properArray = true;
    }

    return params;
  }

  static getBoardFields(message) {
    const fields = message.split(/\s+/).find((val) => val.startsWith('fields='));
    if (fields) {
      return fields.split('=')[1].split(',').filter((x) => c.XYMOND_BOARD_FIELDS.includes(x));
    }
    return c.XYMOND_BOARD_FIELDS;
  }
}

module.exports = { Parser };
