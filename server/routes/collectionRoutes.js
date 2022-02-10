const express = require('express');
const { handlerWrapper } = require('../handlers/utils');
const {
  collectionHandlerGet,
  collectionHandlerGetByCollectionId,
  collectionHandlerPost,
  collectionHandlerPut,
} = require('../handlers/collectionHandler');

const router = express.Router();

router.get('/', handlerWrapper(collectionHandlerGet));

router.get(
  '/:collectionId',
  handlerWrapper(collectionHandlerGetByCollectionId),
);

router.post('/', handlerWrapper(collectionHandlerPost));

router.put('/:collectionId', handlerWrapper(collectionHandlerPut));

module.exports = router;
