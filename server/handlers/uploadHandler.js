const Joi = require('joi');
const { valid: gjv } = require('geojson-validation');
const UploadService = require('../services/UploadService');
const { addShapeUrlToRegionArrayObjects } = require('../utils/helper');
const HttpError = require('../utils/HttpError');

const uploadPostSchema = Joi.object({
  owner_id: Joi.string().uuid().required(),
  collection_name: Joi.string(),
  region_name_property: Joi.string().required(),
  show_on_org_map: Joi.boolean(),
  calculate_statistics: Joi.boolean(),
  shape: Joi.any().required(), // geojson
}).unknown(false);

const uploadHandlerPost = async (req, res) => {
  await uploadPostSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  if (!gjv(req.body.shape)) {
    throw new HttpError(400, 'Invalid GeoJson File Upload.');
  }

  if (req.body.shape.type === 'FeatureCollection' && !req.body.collection_name)
    throw new HttpError(
      422,
      'collection_name is required for FeatureCollections',
    );

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
