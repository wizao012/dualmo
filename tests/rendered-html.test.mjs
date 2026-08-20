import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished DUALMO landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>DUALMO（デュアルモ）/i);
  assert.match(html, /class="hero-brand"/);
  assert.match(html, /fv-desktop-cgi-v3\.jpg/);
  assert.match(html, /fv-mobile-cgi-v3\.jpg/);
  assert.match(html, /dualmo-logo-color-hq\.png/);
  assert.match(html, /dualmo-logo-white-hq\.png/);
  assert.match(html, /入力の進捗状況/);
  assert.match(html, /postal-autofill\.js/);
  assert.match(html, /DUALMO（デュアルモ）/);
  assert.match(html, /日中データ無制限/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("keeps the hero logo responsive and motion accessible", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="hero-brand"/);
  assert.match(page, /className="sr-only">DUALMO（デュアルモ）/);
  assert.match(page, /className="hero-data-flow"/);
  assert.doesNotMatch(page, /className="hero-brand-symbol"/);
  assert.match(css, /@keyframes heroVisualDrift/);
  assert.match(css, /@keyframes heroGlowDrift/);
  assert.match(css, /@keyframes heroDataStream/);
  assert.match(css, /@keyframes heroVisualCgiV2/);
  assert.match(css, /@keyframes heroCircuitScan/);
  assert.match(css, /\.hero-data-flow \.data-stream\{[\s\S]*?bottom:12%;[\s\S]*?opacity:\.56;/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});

test("guards mobile navigation and fixed CTA layout states", async () => {
  const [css, experience] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/dualmo-experience.js", import.meta.url), "utf8"),
  ]);

  assert.match(css, /@media\(max-width:340px\)/);
  assert.match(css, /mobile-cta\.is-hidden-for-footer/);
  assert.match(experience, /is-hidden-for-footer/);
  assert.match(experience, /mobileMenu\.open = false/);
});

test("renders ABOUT highlights as a responsive static grid", async () => {
  const [page, css, experience] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/dualmo-experience.js", import.meta.url), "utf8"),
  ]);
  assert.match(page, /highlights-track highlights-grid/);
  assert.doesNotMatch(page, /data-horizontal-stage|data-horizontal-track|highlights-progress/);
  assert.match(css, /\.highlights-track\.highlights-grid\{[\s\S]*?grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.doesNotMatch(experience, /consumeMobileVerticalInput|data-horizontal-stage/);
});

test("removes the SIM type selector from the application form", async () => {
  const form = await readFile(new URL("../app/ApplicationForm.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(form, /ご希望のSIMタイプ|name="simType"/);
});

test("loads the approved restrained color system", async () => {
  const [layout, tone] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/tone-system.css", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /import "\.\/tone-system\.css"/);
  assert.match(tone, /--blue:#2463e8/);
  assert.match(tone, /\.big-cta\.orange\{[^}]*#0b285a/);
});

test("keeps the docomo feature value compact and readable", async () => {
  const [page, tone] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/tone-system.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /accent: "docomo"/);
  assert.match(tone, /\.network-feature \.feature-value strong\{[^}]*font-size:clamp\(34px,4vw,58px\)/);
});

test("centers both OS card headings", async () => {
  const tone = await readFile(new URL("../app/tone-system.css", import.meta.url), "utf8");
  assert.match(tone, /\.os-head\{justify-content:center\}/);
});

test("renders the refined dual-SIM visual story", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /visuals\/dualmo-esim-cg-v2\.jpg/);
  assert.match(html, /visuals\/dualmo-esim-cg-mobile-v2\.jpg/);
  assert.match(html, /2つの回線を、/);
  assert.doesNotMatch(html, /visual-story lifestyle-story/);
  assert.match(html, /visual-story-copy/);
  assert.match(html, /DUAL SIM ARCHITECTURE/);
});

test("blends the dual-SIM CGI into the surrounding background", async () => {
  const tone = await readFile(new URL("../app/tone-system.css", import.meta.url), "utf8");
  assert.match(tone, /\.visual-story\{[\s\S]*?padding:0;/);
  assert.match(tone, /\.visual-story-inner\{[\s\S]*?width:100%;[\s\S]*?margin:0;/);
  assert.match(tone, /\.mechanism-story \.visual-story-media\{[\s\S]*?border:0;[\s\S]*?box-shadow:none;/);
  assert.match(tone, /\.mechanism-story \.visual-story-media:after\{[\s\S]*?linear-gradient/);
});
