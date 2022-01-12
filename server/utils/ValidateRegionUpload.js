const e = require('express');
const gjv = require('geojson-validation');
const { validate: uuidValidate } = require('uuid');

function validateRegionUpload(regionObj) {
  const { ownerId, name, shape, show_on_org_map, calculate_statistics } =
    regionObj;

  const errors = {
    owner: [],
    name: [],
    shape: [],
    show_on_org_map: [],
    calculate_statistics: [],
  };

  if (!ownerId) {
    errors.owner.push('You must be logged in to create a region.');
  }

  if (!name) {
    errors.name.push('You must provide a name for your new region.');
  } else if (typeof name !== 'string') {
    errors.name.push('You must provide a string value for the name attribute.');
  }

  if (!gjv(shape)) {
    errors.shape.push(
      'Your shape upload must comply with GeoJSON Format Specification revision 1.0. Please see https://geojson.org/geojson-spec.html#geojson-objects for more information.',
    );
  }

  if (show_on_org_map && typeof show_on_org_map !== 'boolean') {
    errors.show_on_org_map.push(
      'Show on organization map value should be a boolean',
    );
  }

  if (calculate_statistics && typeof calculate_statistics !== 'boolean') {
    errors.calculate_statistics.push(
      'Calculate statistics value should be a boolean',
    );
  }

  if (
    !errors.owner &&
    !errors.name &&
    !errors.shape &&
    !errors.show_on_org_map &&
    !errors.calculate_statistics
  ) {
    return 'valid';
  }

  return errors;
}

module.exports = validateRegionUpload;
