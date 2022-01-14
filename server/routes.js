const express = require('express');
const { handlerWrapper } = require('./handlers/utils');
const {
  regionHandlerGet,
  regionHandlerGetByRegionId,
  regionHandlerPost,
  regionHandlerPut,} = require('./handlers/regionHandler')

const router = express.Router();

router.get(
  '/',
  handlerWrapper(regionHandlerGet),
);

router.get(
  '/:regionId',
  handlerWrapper(regionHandlerGetByRegionId),
);

router.post(
  '/',
  handlerWrapper(regionHandlerPost),
);

router.put(
  '/:regionId',
  handlerWrapper(regionHandlerPut),
);

module.exports = router;