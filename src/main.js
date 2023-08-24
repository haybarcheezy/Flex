const { getAllOutages, getSiteInfo, postSiteOutages } = require("./api");
const {
  filterOutagesByDate,
  filterOutagesByDeviceId,
  attachDeviceNameToOutages,
} = require("./utils");

const main = async () => {
  try {
    console.log("Fetching all outages...");
    const outages = await getAllOutages();
    console.log("Total outages fetched:", outages.length);

    const recentOutages = filterOutagesByDate(outages);
    console.log("Outages after date filter:", recentOutages.length);

    console.log("Fetching site info for norwich-pear-tree...");
    const siteInfo = await getSiteInfo("norwich-pear-tree");
    console.log("Site name:", siteInfo.name);

    const validOutages = filterOutagesByDeviceId(recentOutages, siteInfo);
    console.log("Outages after device ID filter:", validOutages.length);

    const enhancedOutages = attachDeviceNameToOutages(validOutages, siteInfo);

    // Log the enhanced outages for user clarity
    console.log("\nOutages to be posted:");
    console.log(JSON.stringify(enhancedOutages, null, 2));

    if (enhancedOutages.length === 0) {
      console.log(
        "No recent outages found for site 'norwich-pear-tree'. No data will be posted."
      );
      return; // Exit early if there are no outages to post.
    }

    await postSiteOutages("norwich-pear-tree", enhancedOutages);
    console.log("Outages posted successfully for site 'norwich-pear-tree'!");
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

main();
