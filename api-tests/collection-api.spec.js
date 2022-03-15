require('dotenv').config();
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-like'));
chai.use(require('chai-things'));
const request = require('./lib/supertest');
const server = require('../server/app');
const knex = require('../server/database/knex');
const region = require('../database/seeds/data/region.json');
const {
  seed: databaseCleaner,
} = require('../database/seeds/00_job_database_cleaner');
const {
  seed: collectionSeed,
  collectionId,
} = require('../database/seeds/02_table_collection');

describe('Collection API tests.', () => {
  beforeEach(async () => {
    await databaseCleaner(knex);
    await collectionSeed(knex);
  });

  it('GET /collection', async () => {
    const res = await request(server).get(`/collection`).expect(200);
    expect(res.body.collections.length).to.equal(1);
    expect(res.body.collections)
      .to.be.an('array')
      .that.contains.something.like({
        owner_id: '2898d0fb-49a0-44f7-8efa-0a5d146d13e6',
        name: 'TestCollection',
      });
  });

  it('GET /collection/:collection_id', async () => {
    const res = await request(server)
      .get(`/collection/${collectionId}`)
      .expect(200);

    expect(res.body.collection.regions)
      .to.be.an('array')
      .that.contains.something.like({
        owner_id: '2898d0fb-49a0-44f7-8efa-0a5d146d13e6',
        name: 'Test Region',
        show_on_org_map: true,
        calculate_statistics: true,
        shape: `region/${region.id}/shape`,
      });

    expect(res.body.collection).to.include.keys([
      'id',
      'name',
      'owner_id',
      'regions',
      'created_at',
      'updated_at',
    ]);
  });

  it('PATCH /collection/:collection_id', async () => {
    const res = await request(server)
      .patch(`/collection/${collectionId}`)
      .send({ name: 'PatchCollection' })
      .expect(200);

    expect(res.body.collection.name).to.equal('PatchCollection');
  });
});
