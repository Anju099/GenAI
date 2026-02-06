# Quick Start Guide - Yahoo Signup BDD Test

## Run the Test

### For Headed Mode (Browser Visible)
```bash
npm run bdd:run
```

### For Headless Mode (No Browser Window)
```bash
npm run bdd:headless
```

## Expected Output

When you run the test, you should see:
1. "Loaded 2 test records from Excel file" - confirming Excel data was loaded
2. The test navigating to Yahoo signup page
3. Form being filled with data from the Excel file
4. Test attempting to submit the form
5. Verification of signup success

## Test Data Location

The test data is stored in: `UserInputSignupForm.xlsx`

Current test data includes:
- **User 1:** John Doe (Male, born 1990)
- **User 2:** Jane Smith (Female, born 1985)

## For More Information

See the comprehensive documentation in `README-BDD-YAHOO-SIGNUP.md`
