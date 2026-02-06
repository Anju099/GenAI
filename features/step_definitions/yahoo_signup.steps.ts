import { Given, When, Then, setDefaultTimeout, BeforeAll } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { YahooSignUpPage } from '../../tests/pages/YahooSignUpPage';
import assert from 'assert';
import * as XLSX from 'xlsx';
import * as path from 'path';

setDefaultTimeout(60 * 1000); // 60 seconds

let browser: Browser;
let page: Page;
let signUpPage: YahooSignUpPage;
let testData: any[] = [];
let currentDataIndex = 0;

// Load Excel data before all tests
BeforeAll(async function() {
  const excelFilePath = path.join(__dirname, '../../UserInputSignupForm.xlsx');
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  testData = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Loaded ${testData.length} test records from Excel file`);
});

Given('I am on the Yahoo signup page', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  signUpPage = new YahooSignUpPage(page);
  await signUpPage.goto();
});

When('I fill in the signup form with valid details', async function () {
  // Use data from Excel file
  if (testData.length === 0) {
    throw new Error('No test data loaded from Excel file');
  }
  
  // Use the first row of test data (or cycle through if multiple scenarios)
  const data = testData[currentDataIndex % testData.length];
  
  // Generate unique email with timestamp
  const uniqueEmail = `${data.email}${Date.now()}@yahoo.com`;
  
  console.log(`Using test data for: ${data.firstName} ${data.lastName}`);
  
  await signUpPage.fillForm({
    firstName: data.firstName,
    lastName: data.lastName,
    email: uniqueEmail,
    password: data.password,
    phone: data.phone,
    birthMonth: data.birthMonth,
    birthDay: data.birthDay,
    birthYear: data.birthYear,
    gender: data.gender
  });
  
  currentDataIndex++;
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
