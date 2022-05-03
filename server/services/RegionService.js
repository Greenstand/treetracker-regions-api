const Region = require('../models/Region');
const Session = require('../database/Session');
const { checkGeometryType } = require('../utils/helper');

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
      await this._session.beginTransaction();
      const featureObject = { ...feature };
      featureObject.properties = feature.shape.properties;
      const geometry = { ...feature.shape.geometry };

      checkGeometryType(geometry.type);

      if (geometry.type === 'Polygon') {
        geometry.type = 'MultiPolygon';
        geometry.coordinates = [geometry.coordinates];
      }

      featureObject.shape = { ...geometry };
      const newRegion = await this._region.createRegion(
        Region.RegionToCreate(featureObject),
      );
      await this._session.commitTransaction();

      return [newRegion];
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  async getRegions(filter, limitOptions, sortOptions) {
    return this._region.getRegions(filter, limitOptions, sortOptions);
  }

  async getRegionsCount(filter) {
    return this._region.getRegionsCount(filter);
  }

  async getRegionById(id) {
    return this._region.getRegionById(id);
  }

  async updateRegion(object) {
    return this._region.updateRegion({
      ...object,
      updated_at: new Date().toISOString(),
    });
  }
}

module.exports = RegionService;
