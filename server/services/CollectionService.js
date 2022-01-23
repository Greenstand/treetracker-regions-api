const { valid: gjv } = require('geojson-validation');
const RegionRepository = require('../repositories/RegionRepository');
const CollectionRepository = require('../repositories/CollectionRepository');
const Collection = require('../models/Collection');
const HttpError = require('../utils/HttpError');
const Region = require('../models/Region');

class CollectionService {
  constructor(session) {
    this._session = session;
    this.regionRepository = new RegionRepository(session);
    this.collectionRepository = new CollectionRepository(session);
  }

  async getAllByFilter(options) {
    const { filter, limit, offset, order } = options;
    const array = await this.collectionRepository.getAllByCollectionFilter(
      filter,
      limit,
      offset,
      order
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
    const newRegions = []
    const collectionAfterCreate = new Collection(collectionObject);
    if (collection.shape.type === 'FeatureCollection') {
        const shapes = collection.shape.features
        for (let i = 0; i < shapes.length; i+=1) {
            const {
              geometry: { coordinates: shape },
              properties,
            } = shapes[i];
            const object = {
                ...collection,
                collectionId: collectionAfterCreate.id,
                name: properties[collection.nameKey],
                shape
            }
            const regionBeforeCreate = new Region(object)
            const newRegion = await this.regionRepository.createRegion(regionBeforeCreate)
            const regionAfterCreate = new Region(newRegion)
            newRegions.push(regionAfterCreate)
        }
    } else if (collection.shape.type === 'GeometryCollection') {
        const shapes = collection.shape.geometries;
        for (let i = 0; i < shapes.length; i += 1) {
          const { coordinates: shape } = shapes[i];
          const object = {
            ...collection,
            collectionId: collectionAfterCreate.id,
            name: null,
            shape,
          };
          const regionBeforeCreate = new Region(object);
          const newRegion = await this.regionRepository.createRegion(
            regionBeforeCreate,
          );
          const regionAfterCreate = new Region(newRegion);
          newRegions.push(regionAfterCreate.toJSON());
        }
    } else {
        throw new HttpError(400)
    }
    return { collection: collectionAfterCreate.toJSON(), regions: newRegions };
  }
}

module.exports = CollectionService