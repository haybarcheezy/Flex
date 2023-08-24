const axios = require("axios");
const { getAllOutages, getSiteInfo, postSiteOutages } = require("../api/index");

jest.mock("axios");

const API_KEY = process.env.API_KEY;

describe("API Functions", () => {
  describe("getAllOutages", () => {
    it("should retrieve all outages", async () => {
      const mockOutages = [
        {
          id: "1",
          begin: "2022-01-01T00:00:00.000Z",
          end: "2022-01-01T12:00:00.000Z",
        },
        {
          id: "2",
          begin: "2022-01-01T12:00:00.000Z",
          end: "2022-01-02T00:00:00.000Z",
        },
      ];
      axios.get.mockResolvedValue({ data: mockOutages });

      const outages = await getAllOutages();
      expect(outages).toEqual(mockOutages);
    });
  });

  describe("getSiteInfo", () => {
    it("should retrieve site information for a given site ID", async () => {
      const mockSiteInfo = {
        id: "site1",
        name: "Site 1",
        devices: [
          { id: "A", name: "Device A" },
          { id: "B", name: "Device B" },
        ],
      };
      axios.get.mockResolvedValue({ data: mockSiteInfo });

      const siteId = "site1";
      const siteInfo = await getSiteInfo(siteId);
      expect(siteInfo).toEqual(mockSiteInfo);
    });
  });

  describe("postSiteOutages", () => {
    it("should post outages for a given site ID", async () => {
      const mockOutages = [
        {
          id: "1",
          name: "Device A",
          begin: "2022-01-01T00:00:00.000Z",
          end: "2022-01-01T12:00:00.000Z",
        },
        {
          id: "2",
          name: "Device B",
          begin: "2022-01-01T12:00:00.000Z",
          end: "2022-01-02T00:00:00.000Z",
        },
      ];
      axios.post.mockResolvedValue({ status: 200 });

      const siteId = "site1";
      await postSiteOutages(siteId, mockOutages);
      expect(axios.post).toHaveBeenCalledWith(
        `https://api.krakenflex.systems/interview-tests-mock-api/v1/site-outages/${siteId}`,
        mockOutages,
        { headers: { "x-api-key": API_KEY } }
      );
    });
  });
});
