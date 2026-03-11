import puppeteer from "puppeteer";
import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "";

const dir = join(__dirname, "temporary screenshots");
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

// Find next available screenshot number
let n = 1;
while (existsSync(join(dir, label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`))) n++;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const filepath = join(dir, filename);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500)); // wait for fonts/animations
await page.screenshot({ path: filepath, fullPage: true });

await browser.close();
console.log(`Screenshot saved: ${filepath}`);
