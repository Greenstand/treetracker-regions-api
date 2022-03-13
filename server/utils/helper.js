const addShapeUrlToRegionArrayObjects = (regions) =>
  regions.map((r) => {
    return { ...r, shape: `region/${r.id}/shape` };
  });

module.exports = {
  addShapeUrlToRegionArrayObjects,
};
