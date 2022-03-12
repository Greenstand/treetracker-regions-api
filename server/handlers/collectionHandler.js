const Joi = require('joi');
const CollectionService = require('../services/CollectionService');
const { addShapeUrlToRegionArrayObjects } = require('../utils/helper');
const HttpError = require('../utils/HttpError');

const collectionIdQuerySchema = Joi.object({
  collection_id: Joi.string().uuid().required(),
}).unknown(false);

const collectionPatchQuerySchema = Joi.object({
  owner_id: Joi.string().uuid(),
  name: Joi.string(),
}).unknown(false);

const collectionHandlerGet = async function (req, res) {
  // filters here
  const collectionService = new CollectionService();
  const collections = await collectionService.getCollections(req.query);
  res.status(200).json({ collections });
};

const collectionHandlerGetByCollectionId = async function (req, res) {
  await collectionIdQuerySchema.validateAsync(req.params, {
    abortEarly: false,
  });

  const collectionService = new CollectionService();
  const [collection] = await collectionService.getCollectionById(
    req.params.collection_id,
  );

  if (!collection)
    throw new HttpError(
      404,
      `collection with ${req.params.collection_id} not found`,
    );

  collection.regions = addShapeUrlToRegionArrayObjects(collection.regions);

  res.status(200).json({ collection });
};

const collectionHandlerPatch = async function (req, res) {
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
