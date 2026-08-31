import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

const targets = [
  { url: "http://localhost:3000/energy-us", file: "energy-us-full.png", fullPage: true },
  { url: "http://localhost:3000/energy-us", file: "energy-us-above-fold.png", fullPage: false },
  { url: "http://localhost:3000/", file: "landing.png", fullPage: false },
];

for (const t of targets) {
  console.log("→", t.url);
  await page.goto(t.url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `/home/user/leadgen-saas/docs/screenshots/${t.file}`,
    fullPage: t.fullPage,
  });
  console.log("  saved", t.file);
}

await browser.close();
