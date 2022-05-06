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

  if (!capabilities.realMobile) {
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
      capabilities.name =
        "login - parallel test " +
        (capabilities.device || capabilities.browserName);
      let statusFail;
      let driver = await createDriver(capabilities);
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
    "add products to cart",
    async () => {
      capabilities.name =
        "add products to cart - parallel test " +
        (capabilities.device || capabilities.browserName);
      let statusFail;
      let driver = await createDriver(capabilities);

      try {
        await driver.get("https://bstackdemo.com/");
        await driver.wait(until.titleMatches(/StackDemo/i), 10000);

        // locating product on webpage and getting name of the product
        let productText = await driver
          .findElement(By.xpath('//*[@id="1"]/p'))
          .getText();
        // clicking the 'Add to cart' button
        await driver.findElement(By.xpath('//*[@id="1"]/div[4]')).click();
        // waiting until the Cart pane has been displayed on the webpage
        driver.findElement(By.className("float-cart__content"));
        // locating product in cart and getting name of the product in cart
        let productCartText = await driver
          .findElement(
            By.xpath(
              '//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]'
            )
          )
          .getText();
        // checking whether product has been added to cart by comparing product name
        expect(productText).toBe(productCartText);
      } catch (e) {
        statusFail = e.message;
      } finally {
        await setStatusAndKillDriver(driver, statusFail);
      }
    },
    10000000
  );
});
