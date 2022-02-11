const Session = require('../models/Session');
const RegionService = require('../services/RegionService');

const regionHandlerGet = async function (req, res, next) {
  const { options } = req.query;
  const session = new Session();
  const regionSerivce = new RegionService(session);
  const ownerRegions = await regionSerivce.getAllByFilter(JSON.parse(options));
  res.status(200).json(ownerRegions);
};

const regionHandlerGetCount = async function (req, res, next) {
  const { filter } = req.query;
  const session = new Session();
  const regionSerivce = new RegionService(session);
  const ownerRegionsCount = await regionSerivce.countByFilter(
    JSON.parse(filter),
  );
  res.status(200).json({
    count: ownerRegionsCount,
  });
};

const regionHandlerGetByRegionId = async function (req, res, next) {
  const { regionId } = req.params;
  const session = new Session();
  const regionSerivce = new RegionService(session);
  const region = await regionSerivce.getById(regionId);
  res.status(200).json({
    region,
  });
};

const regionHandlerPost = async function (req, res, next) {
  const { ownerId } = req.query;
  const region = req.body;
  region.ownerId = ownerId;
  const session = new Session();
  const regionSerivce = new RegionService(session);
  const newRegion = await regionSerivce.createRegion(region);
  res.status(200).json({
    region: newRegion,
  });
};

const regionHandlerPatch = async function (req, res, next) {
  const { regionId } = req.params;
  const region = req.body;
  region.id = regionId;
  const session = new Session();
  const regionSerivce = new RegionService(session);
  const updatedRegion = await regionSerivce.updateRegion(region);
  res.status(200).json({
    region: updatedRegion,
  });
};

module.exports = {
  regionHandlerGet,
  regionHandlerGetCount,
  regionHandlerGetByRegionId,
  regionHandlerPost,
  regionHandlerPatch,
};
