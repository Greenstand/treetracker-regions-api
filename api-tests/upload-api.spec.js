require('dotenv').config();
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-like'));
chai.use(require('chai-things'));
const request = require('./lib/supertest');
const server = require('../server/app');
const knex = require('../server/database/knex');
const {
  seed: databaseCleaner,
} = require('../database/seeds/00_job_database_cleaner');
const feature = require('../database/seeds/data/feature.json');
const featureCollection = require('../database/seeds/data/featureCollection.json');

describe('Collection API tests.', () => {
  beforeEach(async () => {
    await databaseCleaner(knex);
  });

  const regionObject = {
    owner_id: '3f804833-0a22-4449-9214-9979f803167a',
    name: 'Test',
    show_on_org_map: true,
    calculate_statistics: false,
  };

  it('POST /upload  -- feature', async () => {
    const res = await request(server)
      .post(`/upload`)
      .send({ ...regionObject, shape: feature })
      .expect(201);

    expect(res.body).to.be.an('array').that.contains.something.like({
      owner_id: regionObject.owner_id,
      name: regionObject.name,
      show_on_org_map: regionObject.show_on_org_map,
      calculate_statistics: regionObject.calculate_statistics,
    });
  });

  it('POST /upload  -- featureCollection', async () => {
    const res = await request(server)
      .post(`/upload`)
      .send({ ...regionObject, shape: featureCollection })
      .expect(201);

    expect(res.body.length).to.equal(featureCollection.features.length);

    const res3 = await request(server).get(`/collection`).expect(200);
    expect(res3.body.collections.length).to.equal(1);
    expect(res3.body.collections)
      .to.be.an('array')
      .that.contains.something.like({
        owner_id: regionObject.owner_id,
        // name: regionObject.collection_name
      });
  });
});
