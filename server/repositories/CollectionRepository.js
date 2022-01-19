
const BaseRepository = require('./BaseRepository');

class CollectionRepository extends BaseRepository {
  constructor(session) {
    super('collection', session);
    this._tableName = 'collection';
    this._session = session;
  }

  async getAllByCollectionFilter(filter) {
    const { filter: innerFilter, limit, offset } = filter;
    const object = await this._session
      .getDB()
      .select()
      .table(this._tableName)
      .where(innerFilter)
      .limit(limit)
      .offset(offset);
    if (!object) {
      throw new HttpError(
        404,
        `Can not find ${this._tableName} by filter:${JSON.stringify(
          innerFilter,
        )}`,
      );
    }
    return object;
  }
}

module.exports = CollectionRepository;