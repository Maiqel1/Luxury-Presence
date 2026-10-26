import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const site = "https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e";
const stock = "https://img1.wsimg.com/isteam";

const assets = {
  "hero-mountain-falls.jpg": `${site}/mtn%20falls%20pond.jpg`,
  "marci-portrait.jpg": `${site}/photo-5db79f9.jpg`,
  "logo.png": `${site}/blob-6c0c2e0.png`,
  "search-bg.jpg": `${stock}/getty/2223376026`,
  "affiliations/ridge-realty.png": `${site}/BIG%20CIRCLE%202.png`,
  "affiliations/realtor.jpg": `${site}/Realtor%20Pin.jpg`,
  "affiliations/chamber.jpg": `${site}/Chamber.jpg`,
  "affiliations/equal-housing.png": `${site}/Equal%20Housing%20Logo.png`,
  "sold/top-sales.jpg": `${stock}/stock/3395`,
  "sold/list-it.jpg": `${stock}/stock/107927`,
  "sold/buyers-guide.jpg": `${stock}/stock/771`,
  "services/done-right.jpg": `${stock}/stock/12792`,
  "services/commercial-residential.jpg": `${stock}/stock/43920`,
  "services/expertise.jpg": `${stock}/stock/kayaJdA`,
  "gallery/01.jpg": `${site}/4460%20Roseworthy-52.jpg-SMALL.JPG`,
  "gallery/02.jpg": `${site}/5570%20Ailanto-14.jpg-SMALL.JPG`,
  "gallery/03.jpg": `${site}/5570%20Ailanto-45.jpg-SMALL.JPG`,
  "gallery/04.jpg": `${site}/5570%20Ailanto-50.jpg-SMALL.JPG`,
  "gallery/05.jpg": `${site}/4787%20E%20Beacon%20Ridge-54.jpg-SMALL.JPG`,
  "gallery/06.jpg": `${site}/4787%20E%20Beacon%20Ridge-53.jpg-SMALL.JPG`,
  "gallery/07.jpg": `${site}/4787%20E%20Beacon%20Ridge-41.jpg-SMALL.JPG`,
};

const prepare = {
  "logo.png": (image) => image.trim().extend({ top: 18, bottom: 18, left: 18, right: 18, background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: 1400 }),
  "affiliations/ridge-realty.png": (image) => image.resize({ width: 600 }),
  "affiliations/equal-housing.png": (image) => image.resize({ width: 600 }),
};

for (const [file, url] of Object.entries(assets)) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const out = join(root, file);
  await mkdir(dirname(out), { recursive: true });
  const buffer = Buffer.from(await res.arrayBuffer());
  if (prepare[file]) await prepare[file](sharp(buffer)).png().toFile(out);
  else await writeFile(out, buffer);
  console.log(`saved ${file}`);
}
