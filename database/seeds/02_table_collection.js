const region = require('./data/region.json');
const { parseGeometry } = require('../../api-tests/utils');

const collectionId = '71dd3785-9b5a-4ff2-bee5-15f84ca25738';

const seed = async function (knex) {
  await knex('collection').insert({
    owner_id: region.owner_id,
    name: 'TestCollection',
    id: collectionId,
  });
  await knex('region').insert(
    parseGeometry({ ...region, collection_id: collectionId }),
  );
};

module.exports = {
  seed,
  collectionId,
};
