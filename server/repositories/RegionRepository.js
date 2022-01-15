const expect = require('expect-runtime');
const HttpError = require('../utils/HttpError');
const BaseRepository = require('./BaseRepository');

class RegionRepository extends BaseRepository {
  constructor(session) {
    super('region', session);
    this._tableName = 'region';
    this._session = session;
  }

  async getAllByOwnerId(ownerId) {
    const object = await this._session
      .getDB()
      .select()
      .table(this._tableName)
      .where('owner_id', ownerId);
    if (!object) {
      throw new HttpError(
        404,
        `Can not find ${this._tableName} by id:${ownerId}`,
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
        ${collection_id},
        '${created_at.getFullYear()}-${created_at.getMonth() + 1}-${created_at.getDate()} ${created_at.getHours()}:${created_at.getMinutes()}:${created_at.getSeconds()}',
        '${id}',
        '${name}',
        '${owner_id}',
        ${properties},
        ST_TRANSFORM(ST_GeomFromGeoJSON('${JSON.stringify(shape)}'),4326),
        ${show_on_org_map},
        '${updated_at.getFullYear()}-${updated_at.getMonth() + 1}-${updated_at.getDate()} ${updated_at.getHours()}:${updated_at.getMinutes()}:${updated_at.getSeconds()}'
      )
      RETURNING *
    `);
    // expect(result).match({
    //   id: expect.any(String),
    // });
    return result;
  }

  async updateRegion(object) {
    const result = await this._session
      .getDB()(this._tableName)
      .update(object)
      .where('id', object.id)
      .returning('*');
    expect(result).match([
      {
        id: expect.any(String),
      },
    ]);
    return result[0];
  }
}

module.exports = RegionRepository;
