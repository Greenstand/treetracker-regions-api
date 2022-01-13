const express = require('express');
const helper = require('./utils');
const Session = require('../models/Session');
const RegionService = require('../services/RegionService');

const regionRouter = express.Router();

regionRouter.get(
  '/',
  //   helper.apiKeyHandler,
  helper.handlerWrapper(async (req, res, next) => {
    const { ownerId } = req.query;
    const session = new Session();
    const regionSerivce = new RegionService(session);
    const ownerRegions =
      regionSerivce.regionRepository.getAllByOwnerId(ownerId);
    res.status(200).json({
      regions: ownerRegions,
    });
  }),
);

regionRouter.get(
  '/:regionId',
  //   helper.apiKeyHandler,
  helper.handlerWrapper(async (req, res, next) => {
    const { regionId } = req.params;
    const session = new Session();
    const regionSerivce = new RegionService(session);
    const region = regionSerivce.getById(regionId);
    res.status(200).json({
      region,
    });
  }),
);

regionRouter.post(
  '/',
  //   helper.apiKeyHandler,
  helper.handlerWrapper(async (req, res, next) => {
    const region = req.body;
    const session = new Session();
    const regionSerivce = new RegionService(session);
    const newRegion = await regionSerivce.createRegion(region);
    res.status(200).json({
      region: newRegion,
    });
  }),
);

regionRouter.put(
  '/:regionId',
  //   helper.apiKeyHandler,
  helper.handlerWrapper(async (req, res, next) => {
    const { regionId } = req.params;
    const region = req.body;
    region.id = regionId;
    const session = new Session();
    const regionSerivce = new RegionService(session);
    const updatedRegion = await regionSerivce.updateRegion(region);
    res.status(200).json({
      region: updatedRegion,
    });
  }),
);

module.exports = regionRouter;