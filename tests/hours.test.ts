import { describe, expect, it } from "vitest";
import { minuteOfDay, officeStatus } from "@/lib/hours";

describe("officeStatus", () => {
  it("opens at 8:00 am Pacific during daylight time", () => {
    expect(officeStatus(new Date("2026-07-15T14:59:00Z"))).toEqual({ open: false, label: "Closed · opens 8:00 am" });
    expect(officeStatus(new Date("2026-07-15T15:00:00Z")).open).toBe(true);
  });

  it("closes at 7:00 pm Pacific during daylight time", () => {
    expect(officeStatus(new Date("2026-07-16T01:59:00Z")).open).toBe(true);
    expect(officeStatus(new Date("2026-07-16T02:00:00Z"))).toEqual({ open: false, label: "Closed · opens 8:00 am tomorrow" });
  });

  it("follows standard time in winter", () => {
    expect(officeStatus(new Date("2026-01-15T15:30:00Z")).open).toBe(false);
    expect(officeStatus(new Date("2026-01-15T16:00:00Z")).open).toBe(true);
    expect(officeStatus(new Date("2026-01-16T03:00:00Z")).open).toBe(false);
  });

  it("reads midnight as minute zero", () => {
    expect(minuteOfDay(new Date("2026-07-15T07:00:00Z"))).toBe(0);
  });
});
