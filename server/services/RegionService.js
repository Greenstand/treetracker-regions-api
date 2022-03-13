const log = require('loglevel');

const Region = require('../models/Region');
const Session = require('../models/Session');

class RegionService {
  constructor() {
    this._session = new Session();
    this._region = new Region(this._session);
  }

  async getShapeByRegionId(id) {
    return this._region.getShapeByRegionId(id);
  }

  async createFeature(feature) {
    try {
      const featureObject = { ...feature };
      featureObject.properties = feature.shape.properties;
      const geometry = { ...feature.shape.geometry };

      if (geometry.type === 'Polygon') {
        geometry.type = 'MultiPolygon';
        geometry.coordinates = [geometry.coordinates];
      }

      featureObject.shape = { ...geometry };
      const newRegion = await this._region.createRegion(
        Region.RegionToCreate(featureObject),
      );

      return [newRegion];
    } catch (e) {
      log.info('Error:');
      log.info(e);
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async getRegions(filter) {
    return this._region.getRegions(filter);
  }

  async getRegionById(id) {
    return this._region.getRegionById(id);
  }

  async getRegionCount(filter) {
    return this._region.getRegionCount(filter);
  }

  async updateRegion(object) {
    return this._region.updateRegion({
      ...object,
      updated_at: new Date().toISOString(),
    });
  }
}

module.exports = RegionService;
