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

describe("BStack demo test", () => {
  let driver;
  let passed = false;

  beforeAll(() => {
    driver = buildDriver();
  });

  afterAll(async () => {
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
