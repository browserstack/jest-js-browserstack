const { Builder, By } = require("selenium-webdriver");
const browserstackLocal = require("browserstack-local");
const https = require("https");

describe("BStack demo test", () => {
	let driver,
		statusFail = true,
		local = new browserstackLocal.Local();

	beforeEach(async () => {
		const username = process.env.BROWSERSTACK_USERNAME || "",
			accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";

		await new Promise((res) => {
			local.start(
				{
					key: accessKey,
					verbose: true,
					logFile: "./local.log",
				},
				res
			);
		});

		let capabilies = {
			"bstack:options": {
				os: "Windows",
				osVersion: "11",
				local: true,
				seleniumVersion: "4.1.0",
				projectName: "BStack Demo",
				buildName: "jest-browserstack",
				sessionName: "local test",
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

	test("local test", async () => {
		await driver.get("http://bs-local.com:45691/check");

		expect(await driver.findElement(By.css("body")).getText()).toBe(
			"Up and running"
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
		if (local) {
			await new Promise((res) => {
				local.stop(res);
			});
		}
	}, 100000);
});
