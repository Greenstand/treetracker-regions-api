const log = require('loglevel');

const Collection = require('../models/Collection');
const Region = require('../models/Region');
const Session = require('../models/Session');

class CollectionService {
  constructor() {
    this._session = new Session();
    this._region = new Region(this._session);
    this._collection = new Collection(this._session);
  }

  async createFeatureCollection(featureCollection) {
    const createNewRegionsPromises = [];

    const { features } = featureCollection.shape;

    try {
      // create collection instance
      const collectionObject = Collection.CollectionToCreate({
        ...featureCollection,
      });

      await this._collection.createCollection(collectionObject);

      const collection_id = collectionObject.id;

      for (const feature of features) {
        const {
          geometry: { coordinates, type },
          properties,
        } = feature;

        const geometry = { type, coordinates };

        if (geometry.type === 'Polygon') {
          geometry.type = 'MultiPolygon';
          geometry.coordinates = [geometry.coordinates];
        }

        const regionObject = Region.RegionToCreate({
          ...featureCollection,
          shape: geometry,
          properties,
          collection_id,
        });
        createNewRegionsPromises.push(this._region.createRegion(regionObject));
      }

      return Promise.all(createNewRegionsPromises);
    } catch (e) {
      log.info('Error:');
      log.info(e);
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async getCollections(filter = {}) {
    return this._collection.getCollections(filter);
  }

  async getCollectionById(id) {
    return this._collection.getCollectionById(id);
  }

  async updateCollection(object) {
    return this._collection.updateCollection({
      ...object,
      updated_at: new Date().toISOString(), 
    });
  }
}

module.exports = CollectionService;
