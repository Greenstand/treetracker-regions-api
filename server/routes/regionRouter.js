const express = require('express');
const helper = require('./utils');
const Session = require('../models/Session');
const RegionService = require('../services/RegionService');

const regionRouter = express.Router();

regionRouter.get(
  '/',
  helper.apiKeyHandler,
  helper.verifyJWTHandler,
  helper.handlerWrapper(async (req, res, next) => {
    const { ownerId } = req.query;
    const session = new Session();
    const regionSerivce = new RegionService(session);
  }),
);

regionRouter.get(
  '/:regionId',
  helper.apiKeyHandler,
  helper.verifyJWTHandler,
  helper.handlerWrapper(async (req, res, next) => {
    const { ownerId } = req.query;
    const session = new Session();
    const regionSerivce = new RegionService(session);
  }),
);

regionRouter.post(
  '/',
  helper.apiKeyHandler,
  helper.verifyJWTHandler,
  helper.handlerWrapper(async (req, res, next) => {
    const region = req.body;
    const session = new Session();
    const regionSerivce = new RegionService(session);
    const newRegion = await regionSerivce.regionRepository.create(region)
  }),
);

regionRouter.put(
  '/:regionId',
  helper.apiKeyHandler,
  helper.verifyJWTHandler,
  helper.handlerWrapper(async (req, res, next) => {
    const { ownerId } = req.query;
    const session = new Session();
    const regionSerivce = new RegionService(session);
  }),
);