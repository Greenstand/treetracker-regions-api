
const BaseRepository = require('./BaseRepository');

class CollectionRepository extends BaseRepository {
  constructor(session) {
    super('collection', session);
    this._tableName = 'collection';
    this._session = session;
  }

  async getAllByCollectionFilter(filter, limit, offset, order) {
    const object = await this._session
      .getDB()
      .select()
      .table(this._tableName)
      .where(filter)
      .limit(limit)
      .offset(offset)
      .orderBy(...order);
    if (!object) {
      throw new HttpError(
        404,
        `Can not find ${this._tableName} by filter:${JSON.stringify(filter)}`,
      );
    }
    return object;
  }
}

module.exports = CollectionRepository;