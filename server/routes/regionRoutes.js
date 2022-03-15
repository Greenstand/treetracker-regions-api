const express = require('express');
const { handlerWrapper } = require('../handlers/utils');
const {
  regionHandlerGet,
  regionHandlerGetByRegionId,
  regionHandlerPatch,
  regionHandlerGetShapeByRegionId,
} = require('../handlers/regionHandler');

const router = express.Router();

router.get('/', handlerWrapper(regionHandlerGet));

router.get('/:region_id', handlerWrapper(regionHandlerGetByRegionId));

router.get(
  '/:region_id/shape',
  handlerWrapper(regionHandlerGetShapeByRegionId),
);

router.patch('/:region_id', handlerWrapper(regionHandlerPatch));

module.exports = router;
