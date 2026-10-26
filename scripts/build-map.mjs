import DottedMap from "dotted-map";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const places = [
  { id: "seattle", lat: 47.6062, lng: -122.3321 },
  { id: "pahrump", lat: 36.2083, lng: -115.9839 },
  { id: "vegas", lat: 36.1699, lng: -115.1398 },
];

const map = new DottedMap({
  height: 64,
  grid: "diagonal",
  region: { lat: { min: 31, max: 50 }, lng: { min: -127, max: -101 } },
});
for (const place of places) map.addPin({ lat: place.lat, lng: place.lng, data: place.id });

const [, , width, height] = map.getSVG({}).match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);
const points = map.getPoints();
const round = (n) => Math.round(n * 100) / 100;
const path = points
  .filter((point) => !point.data)
  .map((point) => `M${round(point.x)} ${round(point.y)}h0`)
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><path d="${path}" fill="none" stroke="#ffffff" stroke-opacity="0.24" stroke-width="0.46" stroke-linecap="round"/></svg>`;
await writeFile(join(root, "public", "images", "journey-map.svg"), svg);

const pins = Object.fromEntries(
  points.filter((point) => point.data).map((point) => [point.data, { x: round(point.x), y: round(point.y) }]),
);
await writeFile(join(root, "lib", "journey-map.json"), `${JSON.stringify({ width, height, pins }, null, 2)}\n`);

console.log(`map ${width}x${height}, ${points.length} dots, ${(svg.length / 1024).toFixed(1)} KB`);
