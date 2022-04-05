require("dotenv").config();

const username = process.env.BROWSERSTACK_USERNAME || "";
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";

const localIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER || "";

module.exports = {
  os: "Windows",
  os_version: "10",
  browserName: "Chrome",
  browser_version: "latest",
  project: "BStack Demo",
  build: process.env.BROWSERSTACK_BUILD_NAME || "jest-browserstack",
  name: "local test",
  "browserstack.local": true,
  "browserstack.localIdentifier": localIdentifier,
  "browserstack.selenium_version": "3.6.0",
  "browserstack.user": username,
  "browserstack.key": accessKey,
};
