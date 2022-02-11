require('dotenv').config();
const expect = require('expect-runtime');
const connection = require('../config/config').connectionString;

expect(connection).to.match(/^postgresql:\//);
const log = require('loglevel');

const knexConfig = {
  client: 'pg',
  debug: process.env.NODE_LOG_LEVEL === 'debug',
  connection,
  pool: {
    min: 0,
    max: 100,
  },
};
const knex = require('knex')(knexConfig);

log.debug(process.env.DATABASE_SCHEMA);
if (process.env.DATABASE_SCHEMA) {
  log.info('setting a schema');
  knexConfig.searchPath = [process.env.DATABASE_SCHEMA];
}
log.debug(knexConfig.searchPath);

module.exports = knex;
