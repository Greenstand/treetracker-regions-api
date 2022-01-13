const RegionRepository = require('../repositories/RegionRepository');
const { v4: uuidv4 } = require('uuid');
const Region = require('../models/Region');
const gjv = require('geojson-validation');
const HttpError = require('../utils/HttpError');

class RegionService {
  constructor(session) {
    this._session = session;
    this.regionRepository = new RegionRepository(session);
  }

  async getAllByOwnerId(ownerId) {
    const array = await this.regionRepository.getAllByOwnerId(ownerId);
    const regions = array.map((region) => new Region(region, this._session));
    return regions;
  }

  async getById(id) {
    const object = await this.regionRepository.getById(id);
    const region = new Region(object, this._session);
    return region;
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
        const { coordinates: shape, properties } = features[i].geometry;
        const object = new Region(
          {
            ...regionCollection,
            shape,
            properties,
          },
          this._session,
        );
        const newRegion = await this.regionRepository.createRegion(object);
        newRegions.push(newRegion);
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
        const { coordinates: shape, properties } = geometries[i];
        const object = new Region(
          {
            ...regionCollection,
            shape,
            properties,
          },
          this._session,
        );
        const newRegion = await this.regionRepository.createRegion(object);
        newRegions.push(newRegion);
      }
      result = newRegions;
    }
    if (region.shape.type === 'Feature') {
      const object = region;
      object.properties = region.shape.properties;
      object.shape = region.shape.coordinates;
      const newRegion = new Region(object, this._session);
      result = newRegion;
    }
    if (region.shape.type === 'MultiPolygon') {
      const object = region;
      object.shape = region.shape.coordinates;
      const newRegion = new Region(object, this._session);
      result = newRegion;
    }
    return result;
  }

  async updateRegion(region) {
    const object = new Region(region, this._session);
    const updatedRegion = await this.regionRepository.updateRegion(
      object.toJSON(),
    );
    return updatedRegion;
  }
}

module.exports = RegionService;
