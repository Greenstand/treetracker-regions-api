function validateRegionUpload(regionObj) {
  const { ownerId, name, showOnOrgMap, calculateStatistics } =
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

  if (showOnOrgMap && typeof showOnOrgMap !== 'boolean') {
    return false;
  }

  if (calculateStatistics && typeof calculateStatistics !== 'boolean') {
    return false;
  }

  return true;
}

module.exports = validateRegionUpload;
