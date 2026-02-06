import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

// Simple smoke test — replace URL and assertions with your app specifics
test('example smoke test', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
