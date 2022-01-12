const RegionRepository = require('../repositories/RegionRepository');
const { validate: uuidValidate, v4: uuidv4 } = require('uuid');
const Region = require('../models/Region');
const e = require('express');

class RegionService {
    constructor(session){
        this._session = session
        this.regionRepository = new RegionRepository(session);
    }

    async getAllByOwnerId(ownerId) {
        const array = await this.regionRepository.getAllByOwnerId(ownerId);
        const regions = array.map((region) => new Region(region, this._session))
        return regions;
    }

    async getById(id) {
        const object = await this.regionRepository.getById(id)
        const region = new Region(object, this._session)
        return region
    }

    async createRegion(region) {
        // const object = new Region(region, this._session)
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
          return newRegions;
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
          return newRegions;
        }
        // const newRegion = await this.regionRepository.createRegion(
        //   object.toJSON(),
        // );
        // return newRegion
    }

    async updateRegion(region) {
        const object = new Region(region, this._session)
        const updatedRegion = await this.regionRepository.updateRegion(
            object.toJSON()
        );
        return updatedRegion
    }
}

module.exports = RegionService