const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");

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
  
  test("login test", async () => {
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
  }, 1000000);

  test(
    "add products to cart",
    async () => {
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
    },
    10000000
  );
});
