const { validate: uuidValidate, v4: uuidv4 } = require('uuid');
const HttpError = require('../utils/HttpError');
const validateRegionUpload = require('../utils/ValidateRegionUpload')

class Region {
  constructor(idOrJSON, session) {
    if (uuidValidate(idOrJSON)) {
      this._id = idOrJSON;
    } else if (typeof idOrJSON === 'object' && uuidValidate(idOrJSON.id)) {
      this._id = idOrJSON.id;
      this._JSON = idOrJSON;
    } else if (typeof idOrJSON === 'object' && validateRegionUpload(idOrJSON)) {
      this._id = uuidv4();
      this._JSON = idOrJSON;
    } else {
        throw new HttpError(500)
    }
    this._session = session;
  }

  async toJSON() {
    if (this._JSON) {
      return this._JSON;
    }
    this._JSON = await this.regionRepository.getById(this._id);
    return this._JSON;
  }
}

module.exports = Region