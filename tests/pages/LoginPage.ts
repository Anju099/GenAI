import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameSelector = 'input[name="username"]';
  readonly passwordSelector = 'input[name="password"]';
  readonly submitSelector = 'button[type="submit"]';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameSelector, username);
    await this.page.fill(this.passwordSelector, password);
    await this.page.click(this.submitSelector);
  }
}
