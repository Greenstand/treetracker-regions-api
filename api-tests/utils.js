const knex = require('../server/database/knex');

const parseGeometry = (json) => {
  const jsonCopy = { ...json };
  jsonCopy.shape = knex.raw(`ST_SETSRID(ST_GeomFromGeoJSON(?), 4326)`, [
    jsonCopy.shape,
  ]);
  return jsonCopy;
};

module.exports = { parseGeometry };
