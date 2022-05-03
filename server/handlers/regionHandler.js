const Joi = require('joi');
const log = require('loglevel');
const RegionService = require('../services/RegionService');
const {
  addShapeUrlToRegionArrayObjects,
  generatePrevAndNext,
} = require('../utils/helper');

const regionIdQuerySchema = Joi.object({
  region_id: Joi.string().uuid().required(),
}).unknown(false);

const regionPatchQuerySchema = Joi.object({
  owner_id: Joi.string().uuid().allow(null),
  name: Joi.string(),
  show_on_org_map: Joi.boolean(),
  calculate_statistics: Joi.boolean(),
}).unknown(false);

const regionGetQuerySchema = Joi.object({
  owner_id: Joi.string().uuid(),
  name: Joi.string(),
  show_on_org_map: Joi.boolean(),
  calculate_statistics: Joi.boolean(),
  sort_by: Joi.string().valid('name'),
  order: Joi.string().valid('asc', 'desc'),
  limit: Joi.number().integer().greater(0).less(501),
  offset: Joi.number().integer().greater(-1),
});

const regionHandlerGet = async function (req, res, _next) {
  await regionGetQuerySchema.validateAsync(req.query, {
    abortEarly: false,
  });

  const filter = { ...req.query };
  const limitOptions = {};
  const sortOptions = { orderBy: filter.sort_by, order: filter.order };

  const defaultRange = { limit: 100, offset: 0 };
  limitOptions.limit = +filter.limit || defaultRange.limit;
  limitOptions.offset = +filter.offset || defaultRange.offset;

  delete filter.limit;
  delete filter.offset;
  delete filter.sort_by;
  delete filter.order;

  log.debug('filter', filter);
  log.debug('limitOptions', limitOptions);

  const regionService = new RegionService();
  const regions = await regionService.getRegions(
    filter,
    limitOptions,
    sortOptions,
  );
  const count = await regionService.getRegionsCount(filter);

  const updatedResultWithShapeLink = addShapeUrlToRegionArrayObjects(regions);

  const url = 'region';

  const links = generatePrevAndNext({
    url,
    count,
    limitOptions,
    queryObject: { ...filter, ...limitOptions },
  });

  res.status(200).json({
    regions: updatedResultWithShapeLink,
    links,
    query: { count, ...req.query, ...limitOptions },
  });
};

const regionHandlerGetByRegionId = async function (req, res, _next) {
  await regionIdQuerySchema.validateAsync(req.params, {
    abortEarly: false,
  });

  const regionService = new RegionService();
  const region = await regionService.getRegionById(req.params.region_id);

  const [updatedResultWithShapeLink = {}] = addShapeUrlToRegionArrayObjects([
    region,
  ]);

  res.status(200).json({ region: updatedResultWithShapeLink });
};

const regionHandlerGetShapeByRegionId = async function (req, res, _next) {
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

const regionHandlerPatch = async function (req, res, _next) {
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
  regionHandlerGetByRegionId,
  regionHandlerPatch,
  regionHandlerGetShapeByRegionId,
};
