exports.seed = async function (knex) {
  await knex('region').del();
  await knex('collection').del();
};
