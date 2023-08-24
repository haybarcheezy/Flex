// Filters outages based on a given date
const filterOutagesByDate = (outages, date) => {
  return outages.filter((outage) => new Date(outage.begin) >= new Date(date));
};

// Filters outages by given device IDs
const filterOutagesByDeviceId = (outages, deviceIds) => {
  return outages.filter((outage) => deviceIds.includes(outage.id));
};

// function to combine data from the two sources
const attachDeviceNameToOutages = (outages, siteInfo) => {
  return outages.map((outage) => {
    const device = siteInfo.devices.find((device) => device.id === outage.id);
    outage.name = device ? device.name : "Unknown Device";
    return outage;
  });
};

module.exports = {
  filterOutagesByDate,
  filterOutagesByDeviceId,
  attachDeviceNameToOutages,
};
