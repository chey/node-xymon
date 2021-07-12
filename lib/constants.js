const XYMON_CMD_MAXLEN = 12;

const XYMOND_BOARD_FIELDS = [
  'hostname',
  'testname',
  'color',
  'flags',
  'lastchange',
  'logtime',
  'validtime',
  'acktime',
  'disabletime',
  'sender',
  'cookie',
  'line1',
  'ackmsg',
  'dismsg',
  'msg',
  'client',
  'clntstamp',
  'acklist',
  'flapinfo',
  'stats',
  'modifiers',
  'XMH_ALLPAGEPATHS',
  'XMH_BROWSER',
  'XMH_CLASS',
  'XMH_CLIENTALIAS',
  'XMH_COMMENT',
  'XMH_COMPACT',
  'XMH_DEPENDS',
  'XMH_DESCRIPTION',
  'XMH_DGNAME',
  'XMH_DISPLAYNAME',
  'XMH_DOCURL',
  'XMH_DOWNTIME',
  'XMH_PULLDATA',
  'XMH_FLAG_DIALUP',
  'XMH_FLAG_HIDEHTTP',
  'XMH_FLAG_LDAPFAILYELLOW',
  'XMH_FLAG_MULTIHOMED',
  'XMH_FLAG_NOBB2',
  'XMH_FLAG_NOCLEAR',
  'XMH_FLAG_NOCLIENT',
  'XMH_FLAG_NOCONN',
  'XMH_FLAG_NODISP',
  'XMH_FLAG_NOINFO',
  'XMH_FLAG_NONONGREEN',
  'XMH_FLAG_NOPING',
  'XMH_FLAG_NOSSLCERT',
  'XMH_FLAG_NOTRACE',
  'XMH_FLAG_NOTRENDS',
  'XMH_FLAG_PREFER',
  'XMH_FLAG_TESTIP',
  'XMH_FLAG_TRACE',
  'XMH_GROUPID',
  'XMH_HOLIDAYS',
  'XMH_HOSTNAME',
  'XMH_HTTPHEADERS',
  'XMH_IP',
  'XMH_LDAPLOGIN',
  'XMH_NET',
  'XMH_NK',
  'XMH_NKTIME',
  'XMH_NOCOLUMNS',
  'XMH_NOPROP',
  'XMH_NOPROPACK',
  'XMH_NOPROPPURPLE',
  'XMH_NOPROPRED',
  'XMH_NOPROPYELLOW',
  'XMH_NOTAFTER',
  'XMH_NOTBEFORE',
  'XMH_OS',
  'XMH_PAGEINDEX',
  'XMH_PAGENAME',
  'XMH_PAGEPATH',
  'XMH_PAGEPATHTITLE',
  'XMH_PAGETITLE',
  'XMH_RAW',
  'XMH_REPORTTIME',
  'XMH_SSLDAYS',
  'XMH_SSLMINBITS',
  'XMH_TRENDS',
  'XMH_WARNPCT',
  'XMH_WARNSTOPS',
  'XMH_WML',
];

const XYMOND_LOG_FIELDS = [
  'hostname',
  'testname',
  'color',
  'flags',
  'lastchange',
  'logtime',
  'validtime',
  'acktime',
  'disabletime',
  'sender',
  'cookie',
  'ackmsg',
  'dismsg',
  'client',
  'msg',
];

const XYMOND_HOSTINFO_FIELDS = [
  'hostname',
  'ip',
];

const XYMOND_SCHEDULE_FIELDS = [
  'id',
  'timestamp',
  'sender',
  'command',
];

const XYMOND_GHOST_FIELDS = [
  'hostname',
  'ip',
  'lastchange',
];

const XYMOND_BOARD_COMMAND = 'xymondboard';
const XYMOND_LOG_COMMAND = 'xymondlog';
const XYMOND_HOSTINFO_COMMAND = 'hostinfo';
const XYMOND_SCHEDULE_COMMAND = 'schedule';
const XYMOND_CLIENTLOG_COMMAND = 'clientlog';
const XYMOND_GHOST_COMMAND = 'ghostlist';

const XYMOND_DEFAULT_CSV_OPTS = {
  delimiter: '|', escape: '\\', noheader: true, checkType: false, trim: false, headers: ['result'],
};
const XYMOND_MULTI_CSV_OPTS = {
  delimiter: '|', escape: '\\', noheader: true, checkType: true, trim: false, downstreamFormat: 'array',
};
const XYMOND_LOG_CSV_OPTS = {
  delimiter: '|', escape: '\\', noheader: true, eol: true, checkType: true, trim: false,
};
const XYMOND_CLIENTLOG_CSV_OPTS = {
  delimiter: '\\u10', escape: false, noheader: true, eol: '\\u10', checkType: false, trim: false, headers: ['result'],
};

module.exports = {
  XYMON_CMD_MAXLEN,
  XYMOND_BOARD_FIELDS,
  XYMOND_LOG_FIELDS,
  XYMOND_HOSTINFO_FIELDS,
  XYMOND_SCHEDULE_FIELDS,
  XYMOND_GHOST_FIELDS,
  XYMOND_DEFAULT_CSV_OPTS,
  XYMOND_MULTI_CSV_OPTS,
  XYMOND_LOG_CSV_OPTS,
  XYMOND_CLIENTLOG_CSV_OPTS,
  XYMOND_BOARD_COMMAND,
  XYMOND_LOG_COMMAND,
  XYMOND_HOSTINFO_COMMAND,
  XYMOND_SCHEDULE_COMMAND,
  XYMOND_CLIENTLOG_COMMAND,
  XYMOND_GHOST_COMMAND,
};
