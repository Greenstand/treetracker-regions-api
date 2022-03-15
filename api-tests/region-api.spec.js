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
const { seed: regionSeed } = require('../database/seeds/01_table_region');

describe('Region API tests.', () => {
  beforeEach(async () => {
    await databaseCleaner(knex);
    await regionSeed(knex);
  });

  it('GET /region', async () => {
    const res = await request(server).get(`/region`).expect(200);
    expect(res.body.regions.length).to.equal(1);
    expect(res.body).to.have.keys(['regions', 'links', 'query']);
    expect(res.body.regions)
      .to.be.an('array')
      .that.contains.something.like({
        owner_id: '2898d0fb-49a0-44f7-8efa-0a5d146d13e6',
        name: 'Test Region',
        show_on_org_map: true,
        calculate_statistics: true,
        shape: `region/${region.id}/shape`,
      });
  });

  it('GET /region/:region_id', async () => {
    const res = await request(server).get(`/region/${region.id}`).expect(200);

    expect(res.body.region.shape).to.eql(`region/${region.id}/shape`);
    expect(res.body.region).to.include.keys([
      'calculate_statistics',
      'collection_id',
      'id',
      'name',
      'owner_id',
      'show_on_org_map',
      'created_at',
      'updated_at',
      'properties',
      'shape',
    ]);
  });

  it('GET /region/:region_id/shape', async () => {
    const res = await request(server)
      .get(`/region/${region.id}/shape`)
      .expect(200);

    expect(res.header['content-type']).to.equal('application/geo+json');
    expect(res.header['content-disposition']).to.equal(
      `attachment; filename=${region.name}.geojson`,
    );
  });

  it('PATCH /region/:region_id', async () => {
    const res = await request(server)
      .patch(`/region/${region.id}`)
      .send({ name: 'PatchRegion', show_on_org_map: false })
      .expect(200);

    expect(res.body.region.name).to.equal('PatchRegion');
    expect(res.body.region.show_on_org_map).to.equal(false);
  });
});
