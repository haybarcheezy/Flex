const {
  filterOutagesByDate,
  filterOutagesByDeviceId,
  attachDeviceNameToOutages,
} = require("../src/utils");

describe("Utility Functions", () => {
  describe("filterOutagesByDate", () => {
    it("should filter outages based on a given date", () => {
      const mockOutages = [
        { id: "1", deviceId: "A", begin: "2021-01-01T00:00:00.000Z" },
        { id: "2", deviceId: "B", begin: "2021-01-03T00:00:00.000Z" },
        { id: "3", deviceId: "C", begin: "2021-01-05T00:00:00.000Z" },
      ];
      const result = filterOutagesByDate(mockOutages, "2021-01-02");
      expect(result).toEqual([
        { id: "2", deviceId: "B", begin: "2021-01-03T00:00:00.000Z" },
        { id: "3", deviceId: "C", begin: "2021-01-05T00:00:00.000Z" },
      ]);
    });
  });

  describe("filterOutagesByDeviceId", () => {
    it("should filter outages based on given device IDs", () => {
      const mockOutages = [
        { id: "1", deviceId: "A" },
        { id: "2", deviceId: "B" },
        { id: "3", deviceId: "C" },
      ];
      const result = filterOutagesByDeviceId(mockOutages, ["A", "C"]);
      expect(result).toEqual([
        { id: "1", deviceId: "A" },
        { id: "3", deviceId: "C" },
      ]);
    });
  });

  describe("attachDeviceNameToOutages", () => {
    it("should attach device names to outages", () => {
      const mockOutages = [
        { id: "1", deviceId: "A" },
        { id: "2", deviceId: "B" },
        { id: "3", deviceId: "D" },
      ];
      const mockSiteInfo = {
        devices: [
          { id: "A", displayName: "Main Server" },
          { id: "B", displayName: "Backup Server" },
          { id: "C", displayName: "Database Server" },
        ],
      };
      const result = attachDeviceNameToOutages(mockOutages, mockSiteInfo);
      expect(result).toEqual([
        { id: "1", deviceId: "A", deviceName: "Main Server" },
        { id: "2", deviceId: "B", deviceName: "Backup Server" },
        { id: "3", deviceId: "D", deviceName: "Unknown Device" },
      ]);
    });
  });
});
