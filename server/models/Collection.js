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
    this.name = JSON.name
  }
}

module.exports = Collection