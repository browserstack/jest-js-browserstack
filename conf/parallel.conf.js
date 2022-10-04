require("dotenv").config();

const buildName =
  process.env.BROWSERSTACK_BUILD_NAME || "browserstack-build-1";
const username = process.env.BROWSERSTACK_USERNAME || "";
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";

module.exports = [
  {
    os: "Windows",
    os_version: "10",
    browserName: "Chrome",
    browser_version: "latest",
    project: "BStack Demo",
    build: buildName,
    "browserstack.user": username,
    "browserstack.key": accessKey,
    "browserstack.source": "jest-js:sample-selenium-3:v1.0"
  },
  {
    os: "OS X",
    os_version: "Monterey",
    browserName: "Chrome",
    browser_version: "latest",
    project: "BStack Demo",
    build: buildName,
    "browserstack.user": username,
    "browserstack.key": accessKey,
    "browserstack.source": "jest-js:sample-selenium-3:v1.0"
  },
  {
    os: "OS X",
    os_version: "Big Sur",
    browserName: "Safari",
    project: "BStack Demo",
    build: buildName,
    "browserstack.user": username,
    "browserstack.key": accessKey,
    "browserstack.source": "jest-js:sample-selenium-3:v1.0"
  },
  {
    os: "Windows",
    os_version: "11",
    browserName: "Firefox",
    browser_version: "latest",
    project: "BStack Demo",
    build: buildName,
    "browserstack.user": username,
    "browserstack.key": accessKey,
    "browserstack.source": "jest-js:sample-selenium-3:v1.0"
  },
  {
    browserName: "Android",
    device: "Samsung Galaxy S20",
    realMobile: "true",
    project: "BStack Demo",
    build: buildName,
    "browserstack.user": username,
    "browserstack.key": accessKey,
    "browserstack.source": "jest-js:sample-selenium-3:v1.0"
  },
  {
    browserName: "iPhone",
    device: "iPhone 12 Pro Max",
    realMobile: "true",
    project: "BStack Demo",
    build: buildName,
    "browserstack.user": username,
    "browserstack.key": accessKey,
    "browserstack.source": "jest-js:sample-selenium-3:v1.0"
  },
];
