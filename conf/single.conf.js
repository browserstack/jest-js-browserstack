require("dotenv").config();

const username = process.env.BROWSERSTACK_USERNAME || "";
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";

module.exports = {
  os: "Windows",
  os_version: "11",
  browserName: "Chrome",
  browser_version: "latest",
  project: "BStack Demo",
  build: process.env.BROWSERSTACK_BUILD_NAME || "jest-browserstack",
  name: "single test",
  "browserstack.local": "false",
  "browserstack.selenium_version": "3.6.0",
  "browserstack.user": username,
  "browserstack.key": accessKey,
};
