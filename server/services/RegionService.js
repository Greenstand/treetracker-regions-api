const RegionRepository = require('../repositories/RegionRepository');
const { v4: uuidv4 } = require('uuid');
const Region = require('../models/Region');
const {valid: gjv} = require('geojson-validation');
const HttpError = require('../utils/HttpError');

class RegionService {
  constructor(session) {
    this._session = session;
    this.regionRepository = new RegionRepository(session);
  }

  async getAllByFilter(options) {
    const { filter, limit, offset } = options;
    const array = await this.regionRepository.getAllByRegionFilter(
      filter,
      limit,
      offset,
    );
    const regions = array.map((region) => new Region(region).toJSON());
    return regions;
  }

  async countByFilter(filter) {
    const regionCount = await this.regionRepository.countByFilter(
      filter,
    );
    return regionCount
  }

  // async getAllByCollectionId(collectionId) {
  //   const array = await this.regionRepository.getAllByCollectionId(
  //     collectionId,
  //   );
  //   const regions = array.map((region) => new Region(region).toJSON());
  //   return regions;
  // }

  async getById(id) {
    const object = await this.regionRepository.getById(id);
    const region = new Region(object);
    return region.toJSON();
  }

  async createRegion(region) {
    if (!gjv(region.shape)) {
      throw new HttpError(400, 'Invalid File Upload.');
    }
    let result;
    if (region.shape.type === 'FeatureCollection') {
      const regionCollection = region;
      regionCollection.collectionId = uuidv4();
      const { features } = regionCollection.shape;
      delete regionCollection.features;
      const newRegions = [];
      for (let i = 0; i < features.length; i += 1) {
        const { geometry: {coordinates: shape}, properties } = features[i];
        const object = new Region(
          {
            ...regionCollection,
            shape,
            properties
          }
        );
        const regionBeforeCreate = new Region(object);
        const newRegion = await this.regionRepository.createRegion(
          regionBeforeCreate,
        );
        const regionAfterCreate = new Region(newRegion);
        newRegions.push(regionAfterCreate);
      }
      result = newRegions;
    }
    if (region.shape.type === 'GeometryCollection') {
      const regionCollection = region;
      regionCollection.collectionId = uuidv4();
      const { geometries } = regionCollection.shape;
      delete regionCollection.geometries;
      const newRegions = [];
      for (let i = 0; i < geometries.length; i += 1) {
        const { coordinates: shape } = geometries[i];
        const object = {
          ...regionCollection,
          shape
        };
        const regionBeforeCreate = new Region(object);
        const newRegion = await this.regionRepository.createRegion(
          regionBeforeCreate,
        );
        const regionAfterCreate = new Region(newRegion);
        newRegions.push(regionAfterCreate);
      }
      result = newRegions;
    }
    if (region.shape.type === 'Feature') {
      const object = region;
      object.properties = region.shape.properties;
      object.shape = region.shape.geometry.coordinates;
      const regionBeforeCreate = new Region(object);
      const newRegion = await this.regionRepository.createRegion(
        regionBeforeCreate,
      );
      const regionAfterCreate = new Region(newRegion);
      result = regionAfterCreate.toJSON();
    }
    if (region.shape.type === 'MultiPolygon') {
      const object = region;
      object.shape = region.shape;
      const regionBeforeCreate = new Region(object);
      const newRegion = await this.regionRepository.createRegion(regionBeforeCreate)
      const regionAfterCreate = new Region(newRegion);
      result = regionAfterCreate.toJSON();
    }
    return result;
  }

  async updateRegion(region) {
    const object = new Region(region);
    const regionBeforeUpdate = await this.regionRepository.updateRegion(
      object,
    );
    const regionAfterUpdate = new Region(regionBeforeUpdate);
    return regionAfterUpdate.toJSON();
  }
}

module.exports = RegionService;
