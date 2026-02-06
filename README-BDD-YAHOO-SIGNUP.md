# Yahoo Signup BDD Test with Excel Data

This document describes how to run the BDD (Behavior-Driven Development) test case for Yahoo account signup using data from an Excel file.

## Overview

This test automates the Yahoo account signup process using:
- **Cucumber.js** for BDD test framework
- **Playwright** for browser automation
- **exceljs** library for reading Excel data (secure, actively maintained)
- **TypeScript** for type-safe test implementation

## Prerequisites

1. **Node.js** (v16 or higher recommended)
2. **npm** (comes with Node.js)
3. **Playwright browsers** installed

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Test Data

The test reads data from `UserInputSignupForm.xlsx` file located in the root directory. The Excel file should contain the following columns:

| Column Name | Description | Example |
|------------|-------------|---------|
| firstName | User's first name | John |
| lastName | User's last name | Doe |
| email | Email username (without @yahoo.com) | johndoe |
| password | Account password | SecurePass123! |
| phone | Phone number | 5551234567 |
| birthMonth | Birth month (1-12) | 1 |
| birthDay | Birth day (1-31) | 15 |
| birthYear | Birth year (YYYY) | 1990 |
| gender | Gender | Male/Female/Other |

### Sample Excel File

A sample Excel file is included with two test records. You can modify this file to add more test data or change the existing data.

## Running the Test

### Headed Mode (Browser Visible)

To run the test with a visible browser window:

```bash
npm run bdd:run
```

**Note:** This requires a display/GUI environment. If you're running on a headless server, use headless mode instead.

### Headless Mode (No Browser Window)

To run the test in headless mode (useful for CI/CD pipelines):

```bash
npm run bdd:headless
```

Or set the environment variable manually:

```bash
HEADLESS=true npm run bdd:run
```

### Using xvfb-run (Linux servers without display)

If you want to run in headed mode on a Linux server without X11:

```bash
xvfb-run npm run bdd:run
```

## Test Scenario

The BDD test implements the following scenario:

```gherkin
Feature: Yahoo Account Signup

  Scenario: User signs up for a new Yahoo account
    Given I am on the Yahoo signup page
    When I fill in the signup form with valid details
    And I submit the signup form
    Then I should see the account creation confirmation or next step
```

## Implementation Details

### Step Definitions

Located in `features/step_definitions/yahoo_signup.steps.ts`, the step definitions:

1. **Load Excel data** before all tests using the `BeforeAll` hook (uses exceljs library)
2. **Launch browser** in headed or headless mode based on the `HEADLESS` environment variable
3. **Fill the form** with data from the Excel file, generating unique emails with timestamps
4. **Submit the form** and verify success
5. **Capture screenshots** on failure for debugging

### Page Object

Located in `tests/pages/YahooSignUpPage.ts`, the page object provides methods to:

- Navigate to the Yahoo signup page
- Fill in the signup form fields
- Submit the form
- Verify signup success

### Feature File

Located in `features/yahoo_signup.feature`, this file contains the Gherkin syntax test scenario.

## Debugging

If the test fails:

1. Check the console output for error messages
2. Look for a screenshot file `yahoo-signup-error.png` in the project root (created on failure)
3. Review the error messages from the Yahoo signup page (logged to console)
4. Verify your test data in the Excel file is valid

## Customization

### Adding More Test Data

Edit `UserInputSignupForm.xlsx` and add more rows with different test data. The test will cycle through all rows if you run the scenario multiple times.

### Changing Browser Options

Edit `features/step_definitions/yahoo_signup.steps.ts` to modify browser launch options:

```typescript
browser = await chromium.launch({ 
  headless: headlessMode,
  slowMo: 100,  // Add delay between actions
  devtools: true  // Open DevTools
});
```

### Timeout Configuration

The default timeout is 60 seconds. To change it, modify the timeout in `yahoo_signup.steps.ts`:

```typescript
setDefaultTimeout(120 * 1000); // 120 seconds
```

## Troubleshooting

### Permission Denied Errors

If you encounter permission denied errors when running cucumber-js:

```bash
bash node_modules/.bin/cucumber-js --require-module ts-node/register --require features/step_definitions/**/*.ts features/**/*.feature
```

### Missing Browser

If you see "Executable doesn't exist" error:

```bash
npx playwright install chromium
```

### Network Errors

If Yahoo is blocking automated access, you may see CAPTCHA or rate limiting. This is expected behavior from Yahoo to prevent automated signups.

## CI/CD Integration

For continuous integration, use headless mode:

```yaml
# Example GitHub Actions workflow
- name: Run Yahoo Signup BDD Test
  run: npm run bdd:headless
```

## License

This test suite is part of the GenAI project.
