require("dotenv").config();

const localIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER || "";

module.exports = {
  "bstack:options": {
    os: "Windows",
    osVersion: "11",
    local: true,
    localIdentifier: localIdentifier,
    seleniumVersion: "4.1.0",
    projectName: "BStack Demo",
    buildName: process.env.BROWSERSTACK_BUILD_NAME || "browserstack-build-1",
    sessionName: "BStack local jest-js",
    userName: process.env.BROWSERSTACK_USERNAME || "",
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY || "",
    source: "jest-js:sample-selenium-4:v1.1"
  },
  browserName: "Chrome",
  browserVersion: "latest",
};
