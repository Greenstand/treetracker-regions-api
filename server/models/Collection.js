const CollectionRepository = require('../repositories/CollectionRepository');

class Collection {
  constructor(session) {
    this._collectionRepository = new CollectionRepository(session);
  }

  static Collection({ id, owner_id, name, regions, created_at, updated_at }) {
    return Object.freeze({
      id,
      owner_id,
      name,
      regions,
      created_at,
      updated_at,
    });
  }

  static CollectionToCreate({ owner_id, collection_name }) {
    return Object.freeze({
      owner_id,
      name: collection_name,
    });
  }

  async getCollections(filter = {}, limitOptions) {
    const collections = await this._collectionRepository.getByFilter(
      filter,
      limitOptions,
    );

    return collections.map((row) => this.constructor.Collection(row));
  }

  async getCollectionsCount(filter = {}) {
    return this._collectionRepository.countByFilter(filter);
  }

  async createCollection(collectionObject) {
    return this._collectionRepository.create(collectionObject);
  }

  async getCollectionById(id) {
    const [collection = {}] = await this._collectionRepository.getById(id);
    return this.constructor.Collection(collection);
  }

  async updateCollection(collectionObject) {
    return this._collectionRepository.update(collectionObject);
  }
}

module.exports = Collection;
