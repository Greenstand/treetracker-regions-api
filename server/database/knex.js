require('dotenv').config();
const expect = require('expect-runtime');
const knex = require('knex');
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

module.exports = knex(knexConfig);
