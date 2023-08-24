// write jest test to test the api

const axios = require("axios");
const { getAllOutages, getSiteInfo, postSiteOutages } = require("../src/api");
const API_KEY = process.env.API_KEY;

jest.mock("axios");

describe("API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllOutages", () => {
    it("should return all outages from the API", async () => {
      const mockData = [
        {
          id: "1",
          deviceId: "1",
          outageStart: "2021-01-01T00:00:00.000Z",
          outageEnd: "2021-01-01T01:00:00.000Z",
        },
        {
          id: "2",
          deviceId: "2",
          outageStart: "2021-01-01T00:00:00.000Z",
          outageEnd: "2021-01-01T01:00:00.000Z",
        },
      ];

      axios.get.mockResolvedValueOnce({ data: mockData });

      const outages = await getAllOutages();
      expect(outages).toEqual(mockData);
    });
  });

  describe("getSiteInfo", () => {
    it("should return the site info for a given site ID", async () => {
      const mockData = {
        id: "norwich-pear-tree",
        name: "Norwich Pear Tree",
        devices: [
          {
            id: "1",
            displayName: "Main Server",
          },
          {
            id: "2",
            displayName: "Backup Server",
          },
        ],
      };

      axios.get.mockResolvedValueOnce({ data: mockData });

      const siteInfo = await getSiteInfo("norwich-pear-tree");
      expect(siteInfo).toEqual(mockData);
    });
  });

  describe("postSiteOutages", () => {
    it("should post outages to the API for a given site ID", async () => {
      const mockData = [
        {
          id: "1",
          deviceId: "1",
          outageStart: "2021-01-01T00:00:00.000Z",
          outageEnd: "2021-01-01T01:00:00.000Z",
        },
        {
          id: "2",
          deviceId: "2",
          outageStart: "2021-01-01T00:00:00.000Z",
          outageEnd: "2021-01-01T01:00:00.000Z",
        },
      ];

      axios.post.mockResolvedValueOnce({ status: 200 });

      await postSiteOutages("norwich-pear-tree", mockData);
      expect(axios.post).toHaveBeenCalledWith(
        "https://api.krakenflex.systems/interview-tests-mock-api/v1/site-outages/norwich-pear-tree",
        mockData,
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );
    });
  });
});
