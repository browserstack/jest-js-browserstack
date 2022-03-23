require("dotenv").config();

module.exports = {
  "bstack:options": {
    os: "Windows",
    osVersion: "11",
    local: "false",
    seleniumVersion: "4.1.0",
    projectName: "BStack Demo",
    buildName: process.env.BROWSERSTACK_BUILD_NAME || "jest-browserstack",
    sessionName: "single test",
    userName: process.env.BROWSERSTACK_USERNAME || "",
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY || "",
  },
  browserName: "Chrome",
  browserVersion: "latest",
};
