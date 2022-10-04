require("dotenv").config();

const username = process.env.BROWSERSTACK_USERNAME || "";
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";

module.exports = {
  os: "Windows",
  os_version: "11",
  browserName: "Chrome",
  browser_version: "latest",
  project: "BStack Demo",
  build: process.env.BROWSERSTACK_BUILD_NAME || "browserstack-build-1",
  name: "BStack single jest-js",
  "browserstack.local": "false",
  "browserstack.selenium_version": "3.6.0",
  "browserstack.user": username,
  "browserstack.key": accessKey,
  "browserstack.source": "jest-js:sample-selenium-3:v1.0"
};
