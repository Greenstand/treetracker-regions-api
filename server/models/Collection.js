const { v4: uuidv4 } = require('uuid');
const CollectionRepository = require('../repositories/CollectionRepository');

class Collection {
  constructor(session) {
    this._collectionRepository = new CollectionRepository(session);
  }

  static CollectionToCreate({ owner_id, name }) {
    return Object.freeze({
      id: uuidv4(),
      owner_id,
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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
