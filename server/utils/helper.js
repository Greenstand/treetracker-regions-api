const addShapeUrlToRegionArrayObjects = (regions) =>
  regions.map((r) => {
    return { ...r, shape: `region/shape/${r.id}` };
  });

module.exports = {
  addShapeUrlToRegionArrayObjects,
};
