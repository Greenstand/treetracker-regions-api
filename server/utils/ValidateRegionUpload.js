function validateRegionUpload(regionObj) {
  const { ownerId, name, show_on_org_map, calculate_statistics } =
    regionObj;

  if (!ownerId) {
    return false
  }

  if (!name) {
    return false;
  } 
  
  if (typeof name !== 'string') {
    return false;
  }

  if (show_on_org_map && typeof show_on_org_map !== 'boolean') {
    return false;
  }

  if (calculate_statistics && typeof calculate_statistics !== 'boolean') {
    return false;
  }

  return true;
}

module.exports = validateRegionUpload;
