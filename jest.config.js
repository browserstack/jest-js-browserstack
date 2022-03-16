const buildName = `jest-browserstack Dt -  + Date.now()`;
const username = process.env.BROWSERSTACK_USERNAME || "";
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY || "";

module.exports = {
  coverageProvider: "v8",
  globals: {
    CAPABILITIES: [
      {
        os: "Windows",
        os_version: "10",
        browserName: "Chrome",
        browser_version: "latest",
        project: "BStack Demo",
        build: buildName,
        "browserstack.user": username,
        "browserstack.key": accessKey,
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
      },
      {
        os: "OS X",
        os_version: "Big Sur",
        browserName: "Safari",
        project: "BStack Demo",
        build: buildName,
        "browserstack.user": username,
        "browserstack.key": accessKey,
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
      },
      {
        browserName: "Android",
        device: "Samsung Galaxy S20",
        realMobile: "true",
        project: "BStack Demo",
        build: buildName,
        "browserstack.user": username,
        "browserstack.key": accessKey,
      },
      {
        browserName: "iPhone",
        device: "iPhone 12 Pro Max",
        realMobile: "true",
        project: "BStack Demo",
        build: buildName,
        "browserstack.user": username,
        "browserstack.key": accessKey,
      },
    ],
  },
  maxConcurrency: 5,
  maxWorkers: 5,
  roots: ["src"],
  testMatch: ["**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/"],
};
