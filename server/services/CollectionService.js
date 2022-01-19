const { valid: gjv } = require('geojson-validation');
const RegionRepository = require('../repositories/RegionRepository');
const CollectionRepository = require('../repositories/CollectionRepository');
const Collection = require('../models/Collection');
const HttpError = require('../utils/HttpError');

class CollectionService {
  constructor(session) {
    this._session = session;
    this.regionRepository = new RegionRepository(session);
    this.collectionRepository = new CollectionRepository(session);
  }

  async getAllByFilter(filter) {
    const { filter: innerFilter, limit, offset } = filter;
    const array = await this.collectionRepository.getAllByCollectionFilter(
      innerFilter,
      limit,
      offset,
    );
    const collections = array.map((collection) => new Collection(collection));
    return collections;
  }

  async countByFilter(filter) {
    const collectionCount = await this.collectionRepository.countByFilter(
      filter,
    );
    return collectionCount;
  }

  async getById(id) {
    const object = await this.collectionRepository.getById(id);
    const collection = new Collection(object);
    return collection;
  }

  async updateCollection(collection) {
      const collectionBeforeUpdate = new Collection(collection);
      const object = await this.updateCollection(collectionBeforeUpdate);
      const collectionAfterUpdate = new Collection(object)
      return collectionAfterUpdate
  }

  async createCollection(collection) {
    if (!gjv(collection.shape)) {
      throw new HttpError(400, 'Invalid File Upload.');
    }
    const collectionBeforeCreate = new Collection(collection)
    const collectionObject = await this.collectionRepository.create({
      collectionBeforeCreate,
    });
    const collectionAfterCreate = new Collection(collectionObject);
    const shapes = collection.shape.features || collection.shape.geometries
    const regions = []
    for (let i = 0; i < shapes.length; i+=1) {
        const {
          coordinates: geoShape,
          geometry: { coordinates: featureShape },
          properties,
        } = shapes[i];
        let object;
        if (geoShape) {
            
            break
        } else if (featureShape) {

            break
        }
        
    }

  }
}

module.exports = CollectionService