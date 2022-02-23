// @ts-check

const { Builder, By, Key, until } = require("selenium-webdriver");
const browserstackLocal = require("browserstack-local");
const https = require("https");

describe("BStack demo test", () => {
	let driver,
		statusFail = true, 
		// localIdentifier = Date.now().toString();
		localIdentifier = "local-testing";
	
	let local = new browserstackLocal.Local();

	beforeEach(async () => {

		const username = process.env.BROWSERSTACK_USERNAME || "", accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";

		await new Promise((res) => {
			local.start({
				// localIdentifier, 
				key: accessKey, 
				verbose: true, logFile: "./local.log" }, res)
		})

		let capabilies = {
			os: "Windows",
			os_version: "10",
			browserName: "Chrome",
			browser_version: "latest",
			project: "BStack Demo",
			build: "jest-browserstack",
			name: "login test",
			"browserstack.local": true,
			// "browserstack.localIdentifier": localIdentifier,
			"browserstack.selenium_version": "3.6.0",
			"browserstack.user": username,
			"browserstack.key": accessKey,
		};

		driver = await new Builder()
			.usingServer("https://hub-cloud.browserstack.com/wd/hub")
			.withCapabilities(capabilies)
			.usingHttpAgent(
				new https.Agent({
					keepAlive: true,
					keepAliveMsecs: 1000000
				})
			)
			.build();

		await driver.manage().window().maximize();
	}, 100000);

	test("local test", async () => {
		await driver.get("http://bs-local.com:45691/check");

		expect(await driver.findElement(By.css("body")).getText()).toBe("Up and running")

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
		if(local) {
			await new Promise((res) => {
				// @ts-ignore
				local.stop(res);
			})
		}
	}, 100000);
});
