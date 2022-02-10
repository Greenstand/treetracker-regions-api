const { validate: uuidValidate, v4: uuidv4 } = require('uuid');
const HttpError = require('../utils/HttpError');
const validateRegionUpload = require('../utils/ValidateRegionUpload');

class Collection {
  constructor(JSON) {
    if (uuidValidate(JSON.id)) {
      this.id = JSON.id;
    } else if (validateRegionUpload(JSON)) {
      this.id = uuidv4();
    } else {
      throw new HttpError(400, 'Invalid upload.');
    }
    this.owner_id = JSON.ownerId || JSON.owner_id
    this.name = JSON.name
  }

  toJSON() {
      const JSON = {
          id: this.id,
          ownerId: this.ownerId,
          name: this.name
      }
      return JSON
  }
}

module.exports = Collection