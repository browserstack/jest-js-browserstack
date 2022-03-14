const { Builder, By, Key, until } = require("selenium-webdriver");
const https = require("https");
const capabilities = require("../conf/parallel.conf");

const createDriver = async (capabilities) => {
  let driver = await new Builder()
    .usingServer("https://hub.browserstack.com/wd/hub")
    .withCapabilities(capabilities)
    .usingHttpAgent(
      new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 1000000,
      })
    )
    .build();

  if (
    !capabilities.realMobile &&
    !capabilities["bstack:options"] &&
    !capabilities["bstack:options"].realMobile
  ) {
    await driver.manage().window().maximize();
  }

  return driver;
};

const setStatusAndKillDriver = async (driver, statusFail) => {
  if (driver) {
    await driver.executeScript(
      `browserstack_executor: ${JSON.stringify({
        action: "setSessionStatus",
        arguments: {
          status: statusFail ? "failed" : "passed",
          reason: statusFail ? statusFail : "",
        },
      })}`
    );
    await driver.quit();
  }
  if (statusFail) throw statusFail;
};

describe.each(capabilities)("BStack demo test on %j", (capabilities) => {
  test.concurrent(
    "login test",
    async () => {
      capabilities["bstack:options"].sessionName =
        "login - parallel test " +
        (capabilities["bstack:options"].deviceName || capabilities.browserName);
      let driver = await createDriver(capabilities),
        statusFail;
      try {
        await driver.get("https://bstackdemo.com");

        await driver.findElement(By.css("#signin")).click();

        await driver.wait(until.elementLocated(By.css("#username input")));

        await driver
          .findElement(By.css("#username input"))
          .sendKeys("locked_user", Key.ENTER);

        await driver
          .findElement(By.css("#password input"))
          .sendKeys("testingisfun99", Key.ENTER);

        await driver.findElement(By.css("#login-btn")).click();

        await driver.wait(until.elementLocated(By.css(".api-error")));

        expect(await driver.findElement(By.css(".api-error")).getText()).toBe(
          "Your account has been locked."
        );
      } catch (e) {
        statusFail = e.message;
      } finally {
        await setStatusAndKillDriver(driver, statusFail);
      }
    },
    10000000
  );

  test.concurrent(
    "product tests",
    async () => {
      capabilities["bstack:options"].sessionName =
        "product - parallel test " +
        (capabilities["bstack:options"].deviceName || capabilities.browserName);
      let driver = await createDriver(capabilities),
        statusFail;

      try {
        await driver.get("https://bstackdemo.com");

        let products = await driver.findElements(By.css(".shelf-item__title"));

        expect(products).toHaveLength(25);

        await driver.findElement(By.css("input[value='Apple'] + span")).click();

        await driver
          .findElement(By.css("input[value='Samsung'] + span"))
          .click();

        await driver.sleep(1500);

        products = await driver.findElements(By.css(".shelf-item"));

        expect(products).toHaveLength(16);
      } catch (e) {
        statusFail = e.message;
      } finally {
        await setStatusAndKillDriver(driver, statusFail);
      }
    },
    10000000
  );
});
