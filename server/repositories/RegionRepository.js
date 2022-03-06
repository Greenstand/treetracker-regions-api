const expect = require('expect-runtime');
const knexPostgis = require('knex-postgis');
const HttpError = require('../utils/HttpError');
const BaseRepository = require('./BaseRepository');
class RegionRepository extends BaseRepository {
  constructor(session) {
    super('region', session);
  }

  async getAllByRegionFilter(filter, limit, offset, order) {

    const knex = this._session.getDB();
    const st = knexPostgis(knex);
    let promise = knex
      .select(
        'calculate_statistics',
        'collection_id',
        'created_at',
        'id', 
        'name', 
        'owner_id', 
        'properties', 
        st.asGeoJSON('shape'),
        'show_on_org_map',
        'updated_at')
      .table(this._tableName)
      .where((builder) => this.whereBuilder(filter, builder));

    promise = promise.orderBy(
      order?.[0] || 'name',
      order?.[1] || 'asc',
    );

    if (limit) {
      promise = promise.limit(limit);
    }
    if (offset) {
      promise = promise.offset(offset);
    }
  
    const regions = await promise;
    return regions;
  }

  async getAllByCollectionId(collectionId) {
    const object = await this._session
      .getDB()
      .select()
      .table(this._tableName)
      .where('collection_id', collectionId);
    if (!object) {
      throw new HttpError(
        404,
        `Can not find ${this._tableName} by id:${collectionId}`,
      );
    }
    return object;
  }

  async createRegion(object) {
    const st = knexPostgis(this._session.getDB());
    const {
      calculate_statistics,
      collection_id,
      created_at,
      id,
      name,
      owner_id,
      properties,
      shape,
      show_on_org_map,
      updated_at,
    } = object;

    const result = await this._session.getDB().table(this._tableName).insert({
      calculate_statistics,
      collection_id,
      created_at: created_at.toISOString(),
      id,
      name,
      owner_id,
      properties: JSON.stringify(properties),
      shape: st.transform(st.geomFromGeoJSON(JSON.stringify(shape)),4326),
      show_on_org_map,
      updated_at: updated_at.toISOString()
    }).returning('*');

    expect(result.rows[0]).match({
      id: expect.any(String),
    });
    return result.rows[0];
  }

  async createRegions(array) {
    const st = knexPostgis(this._session.getDB());
    const result = await this._session.getDB().table(this._tableName).insert(array.map(({
      calculate_statistics,
      collection_id,
      created_at,
      id,
      name,
      owner_id,
      properties,
      shape,
      show_on_org_map,
      updated_at,
    }) => ({
      calculate_statistics,
      collection_id,
      created_at: created_at.toISOString(),
      id,
      name,
      owner_id,
      properties: JSON.stringify(properties),
      shape: st.transform(st.geomFromGeoJSON(shape),4326),
      show_on_org_map,
      updated_at: updated_at.toISOString()
    }))).returning('*');

    expect(result.rows[0]).match({
      id: expect.any(String),
    });
    return result.rows;
  }

  async updateRegion(object) {
    const {
      calculate_statistics,
      collection_id,
      id,
      name,
      owner_id,
      properties,
      show_on_org_map,
      updated_at,
    } = object;
    const result = await this._session.getDB().table(this._tableName).insert({
      calculate_statistics,
      collection_id,
      id,
      name,
      owner_id,
      properties: JSON.stringify(properties),
      show_on_org_map,
      updated_at: updated_at.toISOString()
    }).returning('*');

    expect(result.rows[0]).match({
      id: expect.any(String),
    });
    return result.rows[0];
  }
}

module.exports = RegionRepository;
