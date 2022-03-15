const Collection = require('../models/Collection');
const Region = require('../models/Region');
const Session = require('../models/Session');
const { checkGeometryType } = require('../utils/helper');

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
      await this._session.beginTransaction();
      // create collection instance
      const collectionObject = Collection.CollectionToCreate({
        ...featureCollection,
      });

      const collection = await this._collection.createCollection(
        collectionObject,
      );

      features.forEach((feature) => {
        const {
          geometry: { coordinates, type },
          properties,
        } = feature;

        const geometry = { type, coordinates };

        checkGeometryType(geometry.type);

        if (geometry.type === 'Polygon') {
          geometry.type = 'MultiPolygon';
          geometry.coordinates = [geometry.coordinates];
        }

        const regionObject = Region.RegionToCreate({
          ...featureCollection,
          shape: geometry,
          properties,
          collection_id: collection.id,
        });
        createNewRegionsPromises.push(this._region.createRegion(regionObject));
      });

      const result = await Promise.all(createNewRegionsPromises);

      await this._session.commitTransaction();

      return result;
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async getCollections(filter, limitOptions) {
    return this._collection.getCollections(filter, limitOptions);
  }

  async getCollectionsCount(filter) {
    return this._collection.getCollectionsCount(filter);
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
