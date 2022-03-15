const region = require('./data/region.json');
const { parseGeometry } = require('../../api-tests/utils');

const seed = async function (knex) {
  await knex('region').insert(parseGeometry({ ...region }));
};

module.exports = {
  seed,
};
