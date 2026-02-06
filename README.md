# Playwright TypeScript Framework (minimal)

This scaffold provides a minimal Playwright + TypeScript test framework.

Setup (PowerShell):

```powershell
cd "C:\Users\hp\OneDrive\GenAI"
npm install
npx playwright install
npm test
```

Files created:
- `package.json` (scripts + devDependencies)
- `playwright.config.ts`
- `tsconfig.json`
- `tests/` (example test and page objects)

Notes:
- Replace the example test URL with your application under test.
- Use `npm run test:headed` to run tests with a visible browser.
