require('dotenv').config();
const expect = require('expect-runtime');
const knex = require('knex');
const log = require('loglevel');
const connection = require('../../config/config').connectionString;

expect(connection).to.match(/^postgresql:\//);

const knexConfig = {
  client: 'pg',
  debug: process.env.NODE_LOG_LEVEL === 'debug',
  connection,
  pool: {
    min: 0,
    max: 100,
  },
};

log.debug(process.env.DATABASE_SCHEMA);
if (process.env.DATABASE_SCHEMA) {
  log.info('setting a schema');
  knexConfig.searchPath = [process.env.DATABASE_SCHEMA, 'public'];
}
log.debug(knexConfig.searchPath);

module.exports = knex(knexConfig);
