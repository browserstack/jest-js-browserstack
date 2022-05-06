const { Builder, By, until } = require("selenium-webdriver");
const capabilities = require("../conf/single.conf");
const https = require("https");

describe("BStack demo test", () => {
  let driver;
  let statusFail = true;

  beforeEach(async () => {
    driver = await new Builder()
      .usingServer("https://hub.browserstack.com/wd/hub")
      .withCapabilities(capabilities)
      .usingHttpAgent(
        new https.Agent({
          keepAlive: true,
          keepAliveMsecs: 1000000,
        })
      )
      .build();

    await driver.manage().window().maximize();
  }, 100000);

  test("add items to cart", async () => {
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

    statusFail = false;
  }, 10000000);

  afterEach(async () => {
    if (statusFail) {
      await driver.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": ""}}`
      );
    } else {
      await driver.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": ""}}`
      );
    }
    if (driver) {
      await driver.quit();
    }
  }, 100000);
});
