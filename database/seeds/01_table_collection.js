const Chance = require('chance');

const chance = new Chance();

//
// These constants can be exported to support other seeds and APIs
// Do not edit!
//
const collectionOneId = '4395ce86-17b6-46de-a814-842f818d18ce';
const collectionOneOwnerId = '792a4eee-8e18-4750-a56f-91bdec383aa6'; // from stakeholder seed

const collectionTwoId = '4763f101-a915-4b86-871b-86714d45a889';
const collectionTwoOwnerId = '344a6130-9094-4a05-8fd6-faf176593fbc'; // from stakeholder seed

//
// Create author data in the database
//
const seed = async function (knex) {
  const collections = [];

  {
    const collection = {
      id: collectionOneId,
      owner_id: collectionOneOwnerId,
      name: chance.word(),
    };
    collections.push(collection);
  }

  {
    const collection = {
      id: collectionTwoId,
      owner_id: collectionTwoOwnerId,
      name: chance.word(),
    };
    collections.push(collection);
  }

  await knex('collection').insert(collections);
};

module.exports = {
  seed,
  collectionOneId,
  collectionOneOwnerId,
  collectionTwoId,
  collectionTwoOwnerId,
};
