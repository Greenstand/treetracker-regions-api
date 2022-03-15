const CollectionRepository = require('../repositories/CollectionRepository');

class Collection {
  constructor(session) {
    this._collectionRepository = new CollectionRepository(session);
  }

  static CollectionToCreate({ owner_id, collection_name }) {
    return Object.freeze({
      owner_id,
      name: collection_name,
    });
  }

  async getCollections(filter) {
    return this._collectionRepository.getByFilter(filter);
  }

  async createCollection(collectionObject) {
    return this._collectionRepository.create(collectionObject);
  }

  async getCollectionById(id) {
    return this._collectionRepository.getById(id);
  }

  async updateCollection(collectionObject) {
    return this._collectionRepository.update(collectionObject);
  }
}

module.exports = Collection;
