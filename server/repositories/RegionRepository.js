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

  async createRegion(object) {
    const result = await super.create(object);
    expect(result).match({
      id: expect.any(String),
    });
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
