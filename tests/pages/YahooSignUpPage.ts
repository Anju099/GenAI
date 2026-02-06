import { Page } from '@playwright/test';

export class YahooSignUpPage {
  private page: Page;
  private url = 'https://login.yahoo.com/account/create';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillForm({ firstName, lastName, email, password, phone, birthMonth, birthDay, birthYear, gender }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    birthMonth: string;
    birthDay: string;
    birthYear: string;
    gender: string;
  }) {
    await this.page.fill('input[name="firstName"]', firstName);
    await this.page.fill('input[name="lastName"]', lastName);
    await this.page.fill('input[name="userId"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.fill('input[name="phone"]', phone);
    await this.page.fill('input[name="mm"]', birthMonth);
    await this.page.fill('input[name="dd"]', birthDay);
    await this.page.fill('input[name="yyyy"]', birthYear);
    await this.page.fill('input[name="freeformGender"]', gender);
  }

  async submitForm() {
    await this.page.click('button#reg-submit-button');
  }

  async isSignUpSuccessful(): Promise<boolean> {
    // Yahoo may redirect or show a confirmation message. Check for next step or confirmation.
    await this.page.waitForTimeout(3000); // Wait for navigation or message
    const url = this.page.url();
    return !url.includes('account/create'); // If URL changed, signup likely proceeded
  }
}
