require("dotenv").config();

module.exports = {
  "bstack:options": {
    os: "Windows",
    osVersion: "11",
    local: "false",
    seleniumVersion: "4.1.0",
    projectName: "BStack Demo",
    buildName: process.env.BROWSERSTACK_BUILD_NAME || "browserstack-build-1",
    sessionName: "BStack single jest-js",
    userName: process.env.BROWSERSTACK_USERNAME || "",
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY || "",
    source: "jest-js:sample-selenium-4-v1.0"
  },
  browserName: "Chrome",
  browserVersion: "latest",
};
