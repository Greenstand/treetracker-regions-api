exports.seed = async function (knex) {
  await knex.raw(`
    DELETE FROM region;
    DELETE FROM collection;
  `);
};
