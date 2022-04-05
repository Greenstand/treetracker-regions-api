const Joi = require('joi');
const log = require('loglevel');
const CollectionService = require('../services/CollectionService');
const {
  addShapeUrlToRegionArrayObjects,
  generatePrevAndNext,
} = require('../utils/helper');
const HttpError = require('../utils/HttpError');

const collectionIdQuerySchema = Joi.object({
  collection_id: Joi.string().uuid().required(),
}).unknown(false);

const collectionPatchQuerySchema = Joi.object({
  owner_id: Joi.string().uuid().allow(null),
  name: Joi.string(),
}).unknown(false);

const collectionGetQuerySchema = Joi.object({
  owner_id: Joi.string().uuid(),
  name: Joi.string(),
  limit: Joi.number().integer().greater(0).less(501),
  offset: Joi.number().integer().greater(-1),
  sort_by: Joi.string().valid('name'),
  order: Joi.string().valid('asc', 'desc'),
}).unknown(false);

const collectionHandlerGet = async function (req, res, _next) {
  await collectionGetQuerySchema.validateAsync(req.query, {
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

  const collectionService = new CollectionService();
  const collections = await collectionService.getCollections(
    filter,
    limitOptions,
    sortOptions,
  );
  const count = await collectionService.getCollectionsCount(filter);

  const url = 'collection';

  const links = generatePrevAndNext({
    url,
    count,
    limitOptions,
    queryObject: { ...filter, ...limitOptions },
  });

  res
    .status(200)
    .json({
      collections,
      links,
      query: { count, ...req.query, ...limitOptions },
    });
};

const collectionHandlerGetByCollectionId = async function (req, res, _next) {
  await collectionIdQuerySchema.validateAsync(req.params, {
    abortEarly: false,
  });

  const collectionService = new CollectionService();
  const collection = await collectionService.getCollectionById(
    req.params.collection_id,
  );

  if (!collection.id)
    throw new HttpError(
      404,
      `collection with ${req.params.collection_id} not found`,
    );

  const modifiedRegions = addShapeUrlToRegionArrayObjects(collection.regions);

  res
    .status(200)
    .json({ collection: { ...collection, regions: modifiedRegions } });
};

const collectionHandlerPatch = async function (req, res, _next) {
  await collectionIdQuerySchema.validateAsync(req.params, {
    abortEarly: false,
  });

  await collectionPatchQuerySchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const collectionService = new CollectionService();
  const updatedCollection = await collectionService.updateCollection({
    ...req.body,
    id: req.params.collection_id,
  });

  res.status(200).json({
    collection: updatedCollection,
  });
};

module.exports = {
  collectionHandlerGet,
  collectionHandlerGetByCollectionId,
  collectionHandlerPatch,
};
