const express = require('express');
const { handlerWrapper } = require('../handlers/utils');
const {
  collectionHandlerGet,
  collectionHandlerGetByCollectionId,
  collectionHandlerPatch,
} = require('../handlers/collectionHandler');

const router = express.Router();

router.get('/', handlerWrapper(collectionHandlerGet));

router.get(
  '/:collection_id',
  handlerWrapper(collectionHandlerGetByCollectionId),
);

router.patch('/:collection_id', handlerWrapper(collectionHandlerPatch));

module.exports = router;
