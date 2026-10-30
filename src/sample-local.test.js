// src/sample-local.test.js from browserstack/jest-js-browserstack (1f03797), run
// against the BrowserStackLocal binary under test. It loads the binary's own page
// (Falcon, port 45454) through the tunnel.
//
// Two ways to run it:
//   - SDK (native runners): `browserstack-node-sdk jest`, the SDK starts the binary
//     from browserstack.yml (browserStackLocalOptions.binarypath) and proxies
//     localhost:4444 to the hub. This is the sample, unchanged.
//   - Plain jest (binary in a container, started by the workflow): HUB_URL is set,
//     so the test talks to the hub itself with local=true + LOCAL_IDENTIFIER.
const { Builder, By, Capabilities } = require("selenium-webdriver");

function buildDriver() {
  if (!process.env.HUB_URL) {
    return new Builder()
      .usingServer(`http://localhost:4444/wd/hub`)
      .withCapabilities(Capabilities.chrome())
      .build();
  }
  return new Builder()
    .usingServer(process.env.HUB_URL)
    .withCapabilities({
      browserName: "Chrome",
      browserVersion: "latest",
      "bstack:options": {
        os: "Windows",
        osVersion: "11",
        local: "true",
        localIdentifier: process.env.LOCAL_IDENTIFIER,
        projectName: process.env.PROJECT_NAME,
        buildName: process.env.BUILD_NAME,
        sessionName: process.env.SESSION_NAME,
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      },
    })
    .build();
}

// CI only: put the Automate build/session links in the GitHub run summary.
async function writeSessionLinks(driver) {
  const fs = require("fs");
  try {
    const id = (await driver.getSession()).getId();
    const auth = Buffer.from(`${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}`).toString("base64");
    const res = await fetch(`https://api.browserstack.com/automate/sessions/${id}.json`, { headers: { Authorization: `Basic ${auth}` } });
    const s = (await res.json()).automation_session || {};
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, [
      `| automate session | \`${id}\` |`,
      `| automate build | ${s.build_hashed_id ? `https://automate.browserstack.com/dashboard/v2/builds/${s.build_hashed_id}` : "n/a"} |`,
      `| session link | ${s.browser_url || "n/a"} |`,
      "",
    ].join("\n"));
  } catch (e) {
    console.error("could not fetch session links:", e.message);
  }
}

describe("BStack demo test", () => {
  let driver;
  let passed = false;

  beforeAll(() => {
    driver = buildDriver();
  });

  afterAll(async () => {
    if (process.env.GITHUB_STEP_SUMMARY) await writeSessionLinks(driver);
    // The SDK marks the session itself; without it, mark it here.
    if (process.env.HUB_URL) {
      const status = { action: "setSessionStatus", arguments: { status: passed ? "passed" : "failed" } };
      await driver.executeScript("browserstack_executor: " + JSON.stringify(status)).catch(() => {});
    }
    await driver.quit();
  })

  test("local test", async () => {
    await driver.get("http://bs-local.com:45454/");

    expect(await driver.getTitle()).toContain('BrowserStack Local');
    passed = true;
  }, 10000000);
});
