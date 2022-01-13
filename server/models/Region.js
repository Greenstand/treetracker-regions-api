const { validate: uuidValidate, v4: uuidv4 } = require('uuid');
const HttpError = require('../utils/HttpError');
const validateRegionUpload = require('../utils/ValidateRegionUpload')

class Region {
    constructor(JSON) {
        if (uuidValidate(JSON.id)) {
          this.id = JSON.id
        } else if (validateRegionUpload(JSON)) {
          this.id = uuidv4();
        } else {
            throw new HttpError(400, "Invalid upload.")
        }
        this.owner_id = JSON.ownerId || JSON.owner_id;
        this.name = JSON.name
        this.shape = JSON.shape
        this.show_on_org_map = JSON.showOnOrgMap || JSON.show_on_org_map
        this.calculate_statistics =
          JSON.calculateStatistics || JSON.calculate_statistics
        this.created_at = JSON.created_at || null
        this.updated_at = JSON.updated_at || null
    }
}


// class Region {
//   constructor(idOrJSON, session) {
//     if (uuidValidate(idOrJSON)) {
//       this._id = idOrJSON;
//     } else if (typeof idOrJSON === 'object' && uuidValidate(idOrJSON.id)) {
//       this._id = idOrJSON.id;
//       this._JSON = idOrJSON;
//     } else if (typeof idOrJSON === 'object' && validateRegionUpload(idOrJSON)) {
//       this._id = uuidv4();
//       this._JSON = idOrJSON;
//     } else {
//         throw new HttpError(400, "Invalid upload.")
//     }
//     this._session = session;
//   }

//   async toJSON() {
//     if (this._JSON) {
//       this._JSON.id = this._id
//       return this._JSON;
//     }
//     this._JSON = await this.regionRepository.getById(this._id);
//     return this._JSON;
//   }
// }

module.exports = Region