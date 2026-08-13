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
  assert.match(html, /dualmo-logo-horizontal-approved-b-hq\.webp/);
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
  assert.match(css, /prefers-reduced-motion:reduce/);
});
