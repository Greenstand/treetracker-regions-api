const express = require('express');
const { handlerWrapper } = require('../handlers/utils');
const {
  regionHandlerGet,
  regionHandlerGetByRegionId,
  _regionHandlerPost,
  regionHandlerPatch,
  regionHandlerGetCount,
  regionHandlerGetShapeByRegionId,
} = require('../handlers/regionHandler');

const router = express.Router();

router.get('/', handlerWrapper(regionHandlerGet));

router.get('/count', handlerWrapper(regionHandlerGetCount));

router.get('/:region_id', handlerWrapper(regionHandlerGetByRegionId));

router.get(
  '/shape/:region_id',
  handlerWrapper(regionHandlerGetShapeByRegionId),
);

router.patch('/:region_id', handlerWrapper(regionHandlerPatch));

module.exports = router;
