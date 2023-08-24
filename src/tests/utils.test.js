const {
  filterOutagesByDate,
  filterOutagesByDeviceId,
  attachDeviceNameToOutages,
} = require("../utils/index");

describe("Utility Functions", () => {
  // Testing the function that filters outages based on a given date
  describe("filterOutagesByDate", () => {
    it("should filter outages based on a given date", () => {
      const mockOutages = [
        { outageId: "1", id: "A", begin: "2021-01-01T00:00:00.000Z" },
        { outageId: "2", id: "B", begin: "2021-01-03T00:00:00.000Z" },
        { outageId: "3", id: "C", begin: "2021-01-05T00:00:00.000Z" },
      ];
      const result = filterOutagesByDate(mockOutages, "2021-01-02");
      expect(result).toEqual([
        { outageId: "2", id: "B", begin: "2021-01-03T00:00:00.000Z" },
        { outageId: "3", id: "C", begin: "2021-01-05T00:00:00.000Z" },
      ]);
    });
  });

  // Testing the function that filters outages based on given device IDs
  describe("filterOutagesByDeviceId", () => {
    it("should filter outages based on given device IDs", () => {
      const mockOutages = [
        { outageId: "1", id: "A" },
        { outageId: "2", id: "B" },
        { outageId: "3", id: "C" },
      ];
      const result = filterOutagesByDeviceId(mockOutages, ["A", "C"]);
      expect(result).toEqual([
        { outageId: "1", id: "A" },
        { outageId: "3", id: "C" },
      ]);
    });
  });

  // Testing the function that attaches device names to outages
  describe("attachDeviceNameToOutages", () => {
    it("should attach device names to outages", () => {
      const mockOutages = [
        { outageId: "1", id: "A" },
        { outageId: "2", id: "B" },
        { outageId: "3", id: "D" },
      ];
      const mockSiteInfo = {
        devices: [
          { id: "A", name: "Main Server" },
          { id: "B", name: "Backup Server" },
          { id: "C", name: "Database Server" },
        ],
      };
      const result = attachDeviceNameToOutages(mockOutages, mockSiteInfo);
      expect(result).toEqual([
        { outageId: "1", id: "A", name: "Main Server" },
        { outageId: "2", id: "B", name: "Backup Server" },
        { outageId: "3", id: "D", name: "Unknown Device" },
      ]);
    });
  });
});
