const { getAllOutages, getSiteInfo, postSiteOutages } = require("./api");
const {
  filterOutagesByDate,
  filterOutagesByDeviceId,
  attachDeviceNameToOutages,
} = require("./utils");

const main = async () => {
  try {
    const outages = await getAllOutages();
    const siteInfo = await getSiteInfo("norwich-pear-tree");

    // Filtering by date
    const recentOutages = filterOutagesByDate(
      outages,
      "2022-01-01T00:00:00.000Z"
    );

    // Extracting device IDs from the siteInfo
    const deviceIds = siteInfo.devices.map((device) => device.id);

    // Filtering by device ID
    const relevantOutages = filterOutagesByDeviceId(recentOutages, deviceIds);

    // Attaching display names
    const transformedData = attachDeviceNameToOutages(
      relevantOutages,
      siteInfo
    );

    await postSiteOutages("norwich-pear-tree", transformedData);
  } catch (error) {
    console.error(error);
  }
};

main();
