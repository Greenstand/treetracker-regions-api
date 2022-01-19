const expect = require('expect-runtime');
const HttpError = require('../utils/HttpError');
const BaseRepository = require('./BaseRepository');

class RegionRepository extends BaseRepository {
  constructor(session) {
    super('region', session);
    this._tableName = 'region';
    this._session = session;
  }

  async getAllByRegionFilter(filter, limit, offset) {
    const object = await this._session
      .getDB()
      .select()
      .table(this._tableName)
      .where(filter)
      .limit(limit)
      .offset(offset);
    if (!object) {
      throw new HttpError(
        404,
        `Can not find ${this._tableName} by filter:${filter}`,
      );
    }
    return object;
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
    const result = await this._session.getDB().raw(`
      INSERT INTO region (calculate_statistics, collection_id, created_at, id, name, owner_id, properties, shape, show_on_org_map, updated_at)
      VALUES(
        ${calculate_statistics},
        '${collection_id}',
        '${created_at.toISOString()}',
        '${id}',
        '${name}',
        '${owner_id}',
        ${properties},
        ST_TRANSFORM(ST_GeomFromGeoJSON('${JSON.stringify(shape)}'),4326),
        ${show_on_org_map},
        '${updated_at.toISOString()}'
      )
      RETURNING *
    `);
    expect(result.rows[0]).match({
      id: expect.any(String),
    });
    return result.rows[0];
  }

  async updateRegion(object) {
    const {
      calculate_statistics,
      collection_id,
      id,
      name,
      owner_id,
      properties,
      shape,
      show_on_org_map,
      updated_at,
    } = object;
    const result = await this._session.getDB().raw(`
      UPDATE region SET (calculate_statistics, collection_id, id, name, owner_id, properties, shape, show_on_org_map, updated_at) = (
        ${calculate_statistics},
        '${collection_id}',
        '${id}',
        '${name}',
        '${owner_id}',
        ${properties},
        ST_TRANSFORM(ST_GeomFromGeoJSON('${JSON.stringify(shape)}'),4326),
        ${show_on_org_map},
        '${updated_at.toISOString()}'
      )
      WHERE id = '${id}'
      RETURNING *
    `);
    expect(result.rows[0]).match({
      id: expect.any(String),
    });
    return result.rows[0];
  }
}

module.exports = RegionRepository;
