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

const generatePrevAndNext = ({
  url,
  count,
  limitOptions: { limit, offset },
  queryObject,
}) => {
  // offset starts from 0, hence the -1
  const noOfIterations = count / limit - 1;
  const currentIteration = offset / limit;

  const queryObjectCopy = { ...queryObject };
  delete queryObjectCopy.offset;

  const query = Object.keys(queryObjectCopy)
    .map((key) => `${key}=${encodeURIComponent(queryObjectCopy[key])}`)
    .join('&');

  const urlWithLimitAndOffset = `${url}?${query}&offset=`;

  const nextUrl =
    currentIteration < noOfIterations
      ? `${urlWithLimitAndOffset}${+offset + +limit}`
      : null;
  let prev = null;
  if (offset - +limit >= 0) {
    prev = `${urlWithLimitAndOffset}${+offset - +limit}`;
  }

  return { next: nextUrl, prev };
};

module.exports = {
  addShapeUrlToRegionArrayObjects,
  checkGeometryType,
  generatePrevAndNext,
};
