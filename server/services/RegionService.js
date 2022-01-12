const { validate: uuidValidate } = require('uuid');
const RegionRepository = require('../repositories/RegionRepository');
const Region = require('../models/Region')

class RegionService {
    constructor(session){
        this._session = session;
        this.regionRepository = new RegionRepository(session);
    }

    async getAllByOwnerId(ownerId) {
        const object = await this.regionRepository.getAllByOwnerId(ownerId);
        const region = new Region(object.id, this._session);
        return region;
    }
}

module.exports = RegionService