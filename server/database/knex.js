require('dotenv').config();
const knex = require('knex');
const connection = require('../../config/config').connectionString;

const postgresPattern = /^postgresql:\//;

if (!postgresPattern.test(connection)) {
  throw new Error('invalid database connection url received');
}

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
