import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "screenshots";

const viewports = [
  { name: "mobile-375", width: 375, height: 812, mobile: true },
  { name: "tablet-768", width: 768, height: 1024, mobile: true },
  { name: "laptop-1024", width: 1024, height: 768, mobile: false },
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
  { name: "wide-1920", width: 1920, height: 1080, mobile: false },
];

const results = [];
let failed = false;

function check(viewport, label, ok, detail = "") {
  results.push({ viewport, label, ok, detail });
  if (!ok) failed = true;
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(400);
}

async function overflowOffenders(page) {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll("body *")) {
      const rect = el.getBoundingClientRect();
      if (rect.width && rect.right > width + 1) {
        const clipped = el.closest("[class*='overflow-hidden'],[class*='overflow-x-auto'],[role='dialog']");
        if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} → ${Math.round(rect.right)}px`);
      }
    }
    return { scrollWidth: document.documentElement.scrollWidth, width, offenders: offenders.slice(0, 8) };
  });
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    isMobile: viewport.mobile,
    hasTouch: viewport.mobile,
  });
  await context.addInitScript(() => window.localStorage.setItem("mm-cookie-notice", "accepted"));
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));

  await page.goto(url, { waitUntil: "networkidle" });
  await scrollThrough(page);

  const overflow = await overflowOffenders(page);
  check(viewport.name, "no horizontal scroll", overflow.scrollWidth <= overflow.width, JSON.stringify(overflow));

  const brokenImages = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => img.loading !== "lazy" || img.getBoundingClientRect().width > 0)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
  );
  check(viewport.name, "all visible images load", brokenImages.length === 0, brokenImages.join(", "));

  const smallText = await page.evaluate(() =>
    Array.from(document.querySelectorAll("p, a, li, label, span, button"))
      .filter((el) => el.offsetParent && el.textContent.trim() && el.children.length === 0)
      .map((el) => [el.textContent.trim().slice(0, 30), parseFloat(getComputedStyle(el).fontSize)])
      .filter(([, size]) => size < 11),
  );
  check(viewport.name, "no text under 11px", smallText.length === 0, JSON.stringify(smallText.slice(0, 5)));

  await page.screenshot({ path: join(outDir, `${viewport.name}-full.png`), fullPage: true });

  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("dialog", { name: "Index" });
  await menu.waitFor();
  await page.screenshot({ path: join(outDir, `${viewport.name}-menu.png`) });
  await page.keyboard.press("Escape");
  const menuClosed = await menu.waitFor({ state: "hidden", timeout: 3000 }).then(() => true, () => false);
  check(viewport.name, "index menu opens and closes with Escape", menuClosed);

  const search = page.locator("#listings form");
  await search.scrollIntoViewIfNeeded();
  await search.getByLabel("Bedrooms", { exact: true }).selectOption({ label: "3+ bedrooms" });
  await search.getByLabel("Baths", { exact: true }).selectOption({ label: "2+ baths" });
  await search.getByLabel("Min Price", { exact: true }).selectOption({ label: "$500k" });
  await search.getByLabel("Max Price", { exact: true }).selectOption({ label: "$300k" });
  await search.getByRole("button", { name: "Search Now" }).click();
  const priceAlert = await search.getByRole("alert").textContent();
  check(viewport.name, "min > max price shows an error", Boolean(priceAlert?.includes("Min price")), priceAlert ?? "");

  await search.getByLabel("Max Price", { exact: true }).selectOption({ label: "$750k" });
  await search.getByRole("button", { name: "Search Now" }).click();
  await page.waitForTimeout(1400);
  const message = await page.locator("#contact textarea").inputValue();
  check(
    viewport.name,
    "search pre-fills the contact message",
    message.includes("3+ bedrooms and 2+ baths") && message.includes("$500k and $750k"),
    message,
  );
  const focusedId = await page.evaluate(() => document.activeElement?.id);
  check(viewport.name, "search focuses the name field", focusedId === "contact-name", String(focusedId));

  const firstPhoto = page.locator('#gallery button[aria-label^="Open photo 1 of"]:visible').first();
  await firstPhoto.scrollIntoViewIfNeeded();
  await firstPhoto.click();
  const dialog = page.getByRole("dialog").filter({ hasText: "Photo" });
  await dialog.waitFor();
  await page.waitForTimeout(500);
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(600);
  const title = await dialog.getByRole("heading").first().textContent();
  await page.screenshot({ path: join(outDir, `${viewport.name}-lightbox.png`) });
  await page.keyboard.press("Escape");
  const lightboxClosed = await dialog.waitFor({ state: "hidden", timeout: 3000 }).then(() => true, () => false);
  check(viewport.name, "lightbox opens and arrow key advances", Boolean(title?.includes("02")), title ?? "");
  check(viewport.name, "lightbox closes with Escape", lightboxClosed);

  const form = page.locator("#contact form");
  await form.scrollIntoViewIfNeeded();
  await form.getByRole("button", { name: "Send" }).click();
  const emailError = await form.getByText("Please enter your email address.").isVisible();
  check(viewport.name, "empty email shows an error", emailError);
  await form.getByLabel("Name").fill("Test Buyer");
  await form.getByLabel(/Email/).fill("buyer@example.com");
  await form.getByRole("button", { name: "Send" }).click();
  const success = await page.getByRole("status").filter({ hasText: "Thanks, Test Buyer!" }).isVisible();
  check(viewport.name, "valid form shows the success state", success);

  const overflowingButtons = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a, button"))
      .filter((el) => el.offsetParent && el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow === "visible")
      .map((el) => el.textContent.trim().slice(0, 40))
      .filter(Boolean),
  );
  check(viewport.name, "no button text overflows its button", overflowingButtons.length === 0, overflowingButtons.join(" | "));

  check(viewport.name, "no console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
  await context.close();
}

async function scrollFrames(css) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addInitScript(() => window.localStorage.setItem("mm-cookie-notice", "accepted"));
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  if (css) await page.addStyleTag({ content: css });
  await scrollThrough(page);
  const result = await page.evaluate(async () => {
    const deltas = [];
    let last = performance.now();
    let running = true;
    const tick = (now) => {
      deltas.push(now - last);
      last = now;
      if (running) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const end = document.documentElement.scrollHeight - window.innerHeight;
    for (let y = 0; y <= end; y += 40) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    running = false;
    const sorted = [...deltas].sort((x, y) => x - y);
    return { p95: Math.round(sorted[Math.floor(sorted.length * 0.95)]), longFrames: deltas.filter((d) => d > 50).length };
  });
  await context.close();
  return result;
}

const withEffects = await scrollFrames("");
const withoutEffects = await scrollFrames(".md\:animate-aurora{display:none!important} #listings .transform-3d{display:none!important}");
check(
  "desktop-1440",
  "effects add under 6ms to the 95th-percentile scroll frame",
  withEffects.p95 - withoutEffects.p95 < 6,
  JSON.stringify({ withEffects, withoutEffects }),
);
await browser.close();

for (const result of results) {
  console.log(`${result.ok ? "PASS" : "FAIL"}  [${result.viewport}] ${result.label}${result.ok || !result.detail ? "" : `\n      ${result.detail}`}`);
}
console.log(failed ? "\nSome checks failed." : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
