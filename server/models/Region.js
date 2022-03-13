const { v4: uuidv4 } = require('uuid');
const RegionRepository = require('../repositories/RegionRepository');

class Region {
  // Add a region model and also for collection
  constructor(session) {
    this._regionRepository = new RegionRepository(session);
  }

  static RegionToCreate({
    owner_id,
    collection_id = null,
    name,
    shape,
    properties,
    show_on_org_map = null,
    calculate_statistics = null,
  }) {
    return Object.freeze({
      id: uuidv4(),
      owner_id,
      collection_id,
      name,
      shape,
      properties,
      show_on_org_map,
      calculate_statistics,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  async createRegion(regionObject) {
    return this._regionRepository.createRegion(regionObject);
  }

  async getShapeByRegionId(id) {
    return this._regionRepository.getShapeByRegionId(id);
  }

  async getRegions(filter = {}) {
    return this._regionRepository.getByFilter(filter);
  }

  async getRegionById(id) {
    return this._regionRepository.getById(id);
  }

  async updateRegion(regionObject) {
    return this._regionRepository.update(regionObject);
  }
}

module.exports = Region;
