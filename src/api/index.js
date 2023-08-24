const axios = require("axios");
require("dotenv").config();
const BASE_URL = "https://api.krakenflex.systems/interview-tests-mock-api/v1";
const API_KEY = process.env.API_KEY;
const MAX_RETRIES = 3;

// return all outages from the API. This function should retry up to 3 times if the API returns a 500 error.
const getAllOutages = async () => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get(`${BASE_URL}/outages`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        retries++;
        console.error(`Error 500: Retrying (${retries}/${MAX_RETRIES})`);
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries reached");
};

// returns the site info for a given site ID
const getSiteInfo = async (siteId) => {
  const response = await axios.get(`${BASE_URL}/site-info/${siteId}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
  return response.data;
};

// posts outages to the API for a given site ID
const postSiteOutages = async (siteId, outages) => {
  return axios
    .post(`${BASE_URL}/site-outages/${siteId}`, outages, {
      headers: {
        "x-api-key": API_KEY,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Outages posted successfully!");
      }
    });
};

module.exports = { getAllOutages, getSiteInfo, postSiteOutages };
