const addShapeUrlToRegionArrayObjects = (regions, baseUrl) =>
  regions.map((r) => {
    return { ...r, shape: `region/shape/${r.id}` };
  });

module.exports = {
  addShapeUrlToRegionArrayObjects,
};
