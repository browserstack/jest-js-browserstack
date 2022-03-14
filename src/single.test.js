const { Builder, By, Key, until } = require("selenium-webdriver");
const https = require("https");

describe("BStack demo test", () => {
	let driver,
		statusFail = true;

	const username = process.env.BROWSERSTACK_USERNAME || "",
		accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";

	beforeEach(async () => {
		let capabilities = {
			"bstack:options": {
				os: "Windows",
				osVersion: "11",
				local: "false",
				seleniumVersion: "4.1.0",
				projectName: "BStack Demo",
				buildName: "jest-browserstack",
				sessionName: "single test",
				userName: username,
				accessKey: accessKey,
			},
			browserName: "Chrome",
			browserVersion: "latest",
		};

		driver = await new Builder()
			.usingServer("https://hub-cloud.browserstack.com/wd/hub")
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
