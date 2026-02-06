import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { YahooSignUpPage } from '../../tests/pages/YahooSignUpPage';
import assert from 'assert';

setDefaultTimeout(60 * 1000); // 30 seconds

let browser: Browser;
let page: Page;
let signUpPage: YahooSignUpPage;

Given('I am on the Yahoo signup page', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  signUpPage = new YahooSignUpPage(page);
  await signUpPage.goto();
});

When('I fill in the signup form with valid details', async function () {
  await signUpPage.fillForm({
    firstName: 'Test',
    lastName: 'User',
    email: `testuser${Date.now()}@yahoo.com`,
    password: 'TestPassword123!',
    phone: '5551234567',
    birthMonth: 'January',
    birthDay: '1',
    birthYear: '1990',
    gender: 'Other'
  });
});

When('I submit the signup form', async function () {
  await signUpPage.submitForm();
});

Then('I should see the account creation confirmation or next step', async function () {
  const result = await signUpPage.isSignUpSuccessful();
  if (!result) {
    // Log error messages from the page
    const errorText = await page.locator('.error-msg, .error, [role="alert"]').allTextContents();
    console.log('Signup error messages:', errorText);
    // Take a screenshot for debugging
    await page.screenshot({ path: 'yahoo-signup-error.png', fullPage: true });
  }
  assert(result, 'Signup did not proceed to confirmation or next step');
  await browser.close();
});
