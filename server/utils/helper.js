const HttpError = require('./HttpError');

const addShapeUrlToRegionArrayObjects = (regions) =>
  regions.map((r) => {
    return { ...r, shape: `region/${r.id}/shape` };
  });

const checkGeometryType = (type) => {
  if (type !== 'Polygon' && type !== 'MultiPolygon') {
    throw new HttpError(
      422,
      'Only geometry of types Polygon and Multipolygon are currently being accepted',
    );
  }
};

module.exports = {
  addShapeUrlToRegionArrayObjects,
  checkGeometryType,
};
