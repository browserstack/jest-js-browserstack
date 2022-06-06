# JestJS BrowserStack <img src="assets/browserstack.png" width=25 height=25> <img src="assets/jest.svg" width=25 height=25>

JestJS integration with BrowserStack for E2E functional testing of UI using Selenium and [browserstack-node-sdk](https://www.npmjs.com/package/browserstack-node-sdk).

## Setup

---

1. Clone the repository
2. Install the dependencies using `npm install` or `yarn install`
3. Set your [BrowserStack Username and Access Key](https://www.browserstack.com/accounts/settings) at [browserstack.yaml](browserstack.yaml).

## Running sample tests

---

- To run sample test, run `npm run sample-test` or `yarn run sample-test`
- To run tests on private websites, 
   - set browserstackLocal: true at [browserstack.yaml](browserstack.yaml)
   - run `npm run sample-local-test` or `yarn run sample-local-test`

## Notes

---

- You can view your test results on the [BrowserStack Automate Dashboard](https://automate.browserstack.com)
- To test on a different set of browsers, check out our [platform configurator](https://browserstack.com/automate/capabilities)

## Additional Resources

---

- [Documentation for writing Automate test scripts in JestJS](https://browserstack.com/docs/automate/selenium/getting-started/nodejs/jest-js)
- [Browsers & mobile devices for selenium testing on BrowserStack](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate)
- [Using REST API to access information about your tests via the command-line interface](https://www.browserstack.com/automate/rest-api)
