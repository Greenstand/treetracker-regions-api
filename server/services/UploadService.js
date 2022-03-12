const RegionService = require('./RegionService');
const CollectionService = require('./CollectionService');
const HttpError = require('../utils/HttpError');

class UploadService {
  constructor() {
    this._regionService = new RegionService();
    this._collectionService = new CollectionService();
  }

  async uploadRegion(regionObject) {
    try {
      switch (regionObject.shape.type) {
        case 'FeatureCollection': {
          return this._collectionService.createFeatureCollection(regionObject);
        }

        case 'Feature': {
          return this._regionService.createFeature(regionObject);
        }

        default: {
          throw new HttpError(
            422,
            'Only GeoJson of types FeatureCollection and Feature are currently supported',
          );
        }
      }
    } catch (e) {
      log.info('Error:');
      log.info(e);
      throw e;
    }
  }
}

module.exports = UploadService;
