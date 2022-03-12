const Joi = require('joi');
const UploadService = require('../services/UploadService');
const { valid: gjv } = require('geojson-validation');
const { addShapeUrlToRegionArrayObjects } = require('../utils/helper');

const uploadPostSchema = Joi.object({
  owner_id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  show_on_org_map: Joi.boolean(),
  calculate_statistics: Joi.boolean(),
  shape: Joi.any().required(), //geojson
}).unknown(false);

const uploadHandlerPost = async (req, res, next) => {
  await uploadPostSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  if (!gjv(req.body.shape)) {
    throw new HttpError(400, 'Invalid GeoJson File Upload.');
  }

  const uploadService = new UploadService();
  const uploadResult = await uploadService.uploadRegion(req.body);

  const updatedResultWithShapeLink =
    addShapeUrlToRegionArrayObjects(uploadResult);

  res.status(201).send(updatedResultWithShapeLink);
  res.end();
};

module.exports = {
  uploadHandlerPost,
};
