// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserProfilePage } from './UserProfilePage';

export class LoginSignUpPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId('login-email-input').filter({ visible: true }).locator('input');
    this.passwordInput = page.getByTestId('login-password-input').filter({ visible: true }).locator('input');
    this.loginButton = page.getByTestId('btn-sign-in').filter({ visible: true });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async goToUserProfile() : Promise<UserProfilePage> {
   
    return new UserProfilePage(this.page);
  }
}

