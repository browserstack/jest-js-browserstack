require("dotenv").config();

const username = process.env.BROWSERSTACK_USERNAME || "";
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";
const buildName =
  process.env.BROWSERSTACK_BUILD_NAME || "browserstack-build-1";

module.exports = [
  {
    "bstack:options": {
      os: "Windows",
      osVersion: "11",
      local: "false",
      seleniumVersion: "4.1.0",
      projectName: "BStack Demo",
      buildName: buildName,
      sessionName: "Bstack parallel jest-js - Chrome latest",
      userName: username,
      accessKey: accessKey,
      source: "jest-js:sample-selenium-4-v1.0"
    },
    browserName: "Chrome",
    browserVersion: "latest",
  },
  {
    "bstack:options": {
      os: "Windows",
      osVersion: "11",
      local: "false",
      seleniumVersion: "4.1.0",
      projectName: "BStack Demo",
      buildName: buildName,
      sessionName: "Bstack parallel jest-js - Chrome latest-1",
      userName: username,
      accessKey: accessKey,
    },
    browserName: "Chrome",
    browserVersion: "latest-1",
  },
  {
    "bstack:options": {
      os: "OS X",
      local: "false",
      seleniumVersion: "4.1.0",
      projectName: "BStack Demo",
      buildName: buildName,
      sessionName: "Bstack parallel jest-js - Safari latest",
      userName: username,
      accessKey: accessKey,
    },
    browserName: "Safari",
    browserVersion: "latest",
  },
  {
    "bstack:options": {
      osVersion: "15",
      deviceName: "iPhone 13",
      realMobile: "true",
      local: "false",
      seleniumVersion: "4.1.0",
      projectName: "BStack Demo",
      buildName: buildName,
      sessionName: "Bstack parallel jest-js - iPhone",
      userName: username,
      accessKey: accessKey,
    },
    browserName: "iPhone",
  },
  {
    "bstack:options": {
      osVersion: "12.0",
      deviceName: "Google Pixel 6 Pro",
      realMobile: "true",
      local: "false",
      seleniumVersion: "4.1.0",
      projectName: "BStack Demo",
      buildName: buildName,
      sessionName: "Bstack parallel jest-js - Android",
      userName: username,
      accessKey: accessKey,
    },
    browserName: "Chrome",
  },
];
