export const OFFICE_TIME_ZONE = "America/Los_Angeles";
export const OPEN_MINUTE = 8 * 60;
export const CLOSE_MINUTE = 19 * 60;

export type OfficeStatus = {
  open: boolean;
  label: string;
};

export function minuteOfDay(date: Date, timeZone: string = OFFICE_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export function officeStatus(now: Date = new Date()): OfficeStatus {
  const minute = minuteOfDay(now);
  if (minute >= OPEN_MINUTE && minute < CLOSE_MINUTE) {
    return { open: true, label: "Open now · until 7:00 pm" };
  }
  return {
    open: false,
    label: minute < OPEN_MINUTE ? "Closed · opens 8:00 am" : "Closed · opens 8:00 am tomorrow",
  };
}
