const BaseRepository = require('./BaseRepository');

class CollectionRepository extends BaseRepository {
  constructor(session) {
    super('collection', session);
    this._tableName = 'collection';
    this._session = session;
  }

  async getById(id) {
    return this._session
      .getDB()(this._tableName)
      .innerJoin('region', 'collection.id', '=', 'region.collection_id') // use left join instead??
      .select(
        'collection.id',
        'collection.name',
        'collection.owner_id',
        'collection.created_at',
        'collection.updated_at',
        this._session.getDB().raw(`json_agg(region.*) as regions`),
      )
      .groupBy('collection.id')
      .where('collection.id', id);
  }
}

module.exports = CollectionRepository;
