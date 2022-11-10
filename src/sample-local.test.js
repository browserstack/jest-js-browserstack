const { Builder, By, Capabilities } = require("selenium-webdriver");

describe("BStack demo test", () => {
  let driver;

  beforeAll(() => {
    driver = new Builder()
      .usingServer(`http://localhost:4444/wd/hub`)
      .withCapabilities(Capabilities.chrome())
      .build();
  });
  
  afterAll(async () => {
    await driver.quit();
  })

  test("local test", async () => {
    await driver.get("http://bs-local.com:45454/");

    expect(await driver.getTitle()).toContain('BrowserStack Local');
  }, 10000000);
});
