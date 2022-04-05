# JestJS BrowserStack <img src="assets/browserstack.png" width=25 height=25> <img src="assets/jest.svg" width=25 height=25>

JestJS integration with BrowserStack for E2E functional testing of UI using Selenium 3.

> To perform tests using Selenium 4, please checkout the selenium 4 branch

## Setup

---

1. Clone the repository
2. Install the dependencies using `npm install` or `yarn install`
3. Set environment variables with your [BrowserStack Username and Access Key](https://www.browserstack.com/accounts/settings)
4. Set them as environment variables:
   - on mac
     ```sh
     export BROWSERSTACK_USERNAME=YOUR_USERNAME
     export BROWSERSTACK_ACCESS_KEY=YOUR_ACCESS_KEY
     ```
   - on windows
     ```sh
     set BROWSERSTACK_USERNAME=YOUR_USERNAME
     set BROWSERSTACK_ACCESS_KEY=YOUR_ACCESS_KEY
     ```

## Running sample tests

---

- To run a single test, run `npm run single` or `yarn run single`
- To run parallel tests, run `npm run parallel` or `yarn run parallel`
- To run tests on private websites, run `npm run local` or `yarn run local`

## Notes

---

- You can view your test results on the [BrowserStack Automate Dashboard](https://automate.browserstack.com)
- To test on a different set of browsers, check out our [platform configurator](https://browserstack.com/automate/capabilities)

## Additional Resources

---

- [Documentation for writing Automate test scripts in JestJS](https://browserstack.com/docs/automate/selenium/getting-started/nodejs/jest-js)
- [Browsers & mobile devices for selenium testing on BrowserStack](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate)
- [Using REST API to access information about your tests via the command-line interface](https://www.browserstack.com/automate/rest-api)
