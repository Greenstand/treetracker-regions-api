const Joi = require('joi');
const RegionService = require('../services/RegionService');
const { addShapeUrlToRegionArrayObjects } = require('../utils/helper');

const regionIdQuerySchema = Joi.object({
  region_id: Joi.string().uuid().required(),
}).unknown(false);

const regionPatchQuerySchema = Joi.object({
  owner_id: Joi.string().uuid(),
  name: Joi.string(),
  show_on_org_map: Joi.boolean(),
  calculate_statistics: Joi.boolean(),
}).unknown(false);

// const regionGetQuerySchema = Joi.object({});

const regionHandlerGet = async function (req, res, next) {
  // await regionGetQuerySchema.validateAsync(req.query, {
  //   abortEarly: false,
  // });

  const filter = {};

  const regionService = new RegionService();
  const regions = await regionService.getRegions(filter);
  const count = await regionService.getRegionCount(filter?.where);

  const updatedResultWithShapeLink = addShapeUrlToRegionArrayObjects(regions);

  res.status(200).json({ regions: updatedResultWithShapeLink, count });
};

const regionHandlerGetCount = async function (req, res, next) {
  const filter = {};
  const regionService = new RegionService();
  const count = await regionService.getRegionCount(filter);
  res.status(200).json({ count });
}

const regionHandlerGetByRegionId = async function (req, res, next) {
  await regionIdQuerySchema.validateAsync(req.params, {
    abortEarly: false,
  });

  const regionService = new RegionService();
  const region = await regionService.getRegionById(req.params.region_id);

  const [updatedResultWithShapeLink] = addShapeUrlToRegionArrayObjects([
    region,
  ]);

  res.status(200).json({ region: updatedResultWithShapeLink });
};

const regionHandlerGetShapeByRegionId = async function (req, res, next) {
  await regionIdQuerySchema.validateAsync(req.params, {
    abortEarly: false,
  });

  const regionService = new RegionService();
  const result = await regionService.getShapeByRegionId(req.params.region_id);

  res.writeHead(200, {
    'Content-Type': 'application/geo+json',
    'Content-Disposition': `attachment; filename=${result.name}.geojson`,
  });

  res.write(result.shape);
  res.end();
};

const regionHandlerPatch = async function (req, res, next) {
  await regionIdQuerySchema.validateAsync(req.params, {
    abortEarly: false,
  });

  await regionPatchQuerySchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const regionService = new RegionService();
  const updatedRegion = await regionService.updateRegion({
    ...req.body,
    id: req.params.region_id,
  });

  const [updatedResultWithShapeLink] = addShapeUrlToRegionArrayObjects([
    updatedRegion,
  ]);

  res.status(200).json({
    region: updatedResultWithShapeLink,
  });
};

module.exports = {
  regionHandlerGet,
  regionHandlerGetCount,
  regionHandlerGetByRegionId,
  regionHandlerPatch,
  regionHandlerGetShapeByRegionId,
};
