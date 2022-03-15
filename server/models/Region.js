const RegionRepository = require('../repositories/RegionRepository');

class Region {
  // Add a region model and also for collection
  constructor(session) {
    this._regionRepository = new RegionRepository(session);
  }

  static Region({
    id,
    owner_id,
    collection_id,
    name,
    shape,
    properties,
    show_on_org_map,
    calculate_statistics,
    created_at,
    updated_at,
  }) {
    return Object.freeze({
      id,
      owner_id,
      collection_id,
      name,
      shape,
      properties,
      show_on_org_map,
      calculate_statistics,
      created_at,
      updated_at,
    });
  }

  static RegionToCreate({
    owner_id,
    collection_id = null,
    region_name_property,
    shape,
    properties,
    show_on_org_map = null,
    calculate_statistics = null,
  }) {
    return Object.freeze({
      owner_id,
      collection_id,
      name: properties[region_name_property],
      shape,
      properties,
      show_on_org_map,
      calculate_statistics,
    });
  }

  async createRegion(regionObject) {
    return this._regionRepository.createRegion(regionObject);
  }

  async getShapeByRegionId(id) {
    return this._regionRepository.getShapeByRegionId(id);
  }

  async getRegions(filter = {}, limitOptions) {
    const regions = await this._regionRepository.getByFilter(
      filter,
      limitOptions,
    );

    return regions.map((row) => this.constructor.Region(row));
  }

  async getRegionsCount(filter = {}) {
    return this._regionRepository.countByFilter(filter);
  }

  async getRegionById(id) {
    const region = await this._regionRepository.getById(id);
    return this.constructor.Region(region);
  }

  async updateRegion(regionObject) {
    return this._regionRepository.update(regionObject);
  }
}

module.exports = Region;
