// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserProfilePage } from './UserProfilePage';
import { getElement, getRadioGroupElement, UserRole } from 'Playwright/helper/ui/uiDriverHelper.helper';

export class LoginSignUpPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  public readonly register_UsernameInput : Locator;
  public readonly register_EmailInput : Locator;
  public readonly register_PhoneInput : Locator;
  public readonly register_PasswordInput : Locator;
  public readonly register_Confirmation_PasswordInput : Locator;

  public readonly btn_register : Locator;
  public readonly btnToggleAuth : Locator;
  
  public readonly msgErrorEventName : Locator;
  public readonly radioGroupUserType : Locator;


  
  public readonly MSG_USER_EMAIL = "The email field is required";
  public readonly MSG_USER__EXIST_EMAIL = "There is already a user with email: ";
  public readonly MSG_USER_WRONGFORMAT_EMAIL = "The email field must be a valid email address.";
  public readonly MSG_USER_PASSWORD = "The password field is required";
  public readonly MSG_USER_NOT_SAME_PASSWORD = "The password field confirmation does not match."
  public readonly MSG_USER_INVALID = "The password field is required"
  public readonly MSG_USER_PHONE = "The num tel field is required.";
   public readonly MSG_USER_USERNAME = "The username field is required."
  public readonly MSG_USER_EXIST_USERNAME = "There is already a user with username: "

  public readonly MSG_USER_INVALID_CREDENTIELS = "Invalid credentials."


  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId('login-email-input').filter({ visible: true }).locator('input');
    this.passwordInput = page.getByTestId('login-password-input').filter({ visible: true }).locator('input');
    this.loginButton = page.getByTestId('btn-sign-in').filter({ visible: true });
    this.btnToggleAuth = page.getByTestId("toggle-auth-mode").filter({ visible: true });
    this.register_UsernameInput = page.getByTestId("register-username-input").filter({ visible: true }).locator('input');;
    this.register_EmailInput = page.getByTestId("register-email-input").filter({ visible: true }).locator('input');;
    this.register_PhoneInput = page.getByTestId("register-phone-input").filter({ visible: true }).locator('input');;
    this.register_PasswordInput = page.getByTestId("register-password-input").filter({ visible: true }).locator('input');;
    this.register_Confirmation_PasswordInput = page.getByTestId("register-password_confirmation-input").filter({ visible: true }).locator('input');;
    this.btn_register = page.getByTestId("btn-new-register").first();
    this.btnToggleAuth = page.getByTestId("toggle-auth-mode").filter({ visible: true }).first()
    this.msgErrorEventName = page.locator(".error");
    this.radioGroupUserType = page.getByTestId("user-type-group");

  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    await this.page.waitForLoadState('networkidle');
  }

    async register(pUsername: string,pEmail: string,pPhone: string, pPassword: string, pPassword_Confirmation, pRadioChoice : string) {
       await this.page.waitForLoadState('networkidle'); 
      await this.btnToggleAuth.click();
      await getElement(this.register_UsernameInput,pUsername);
      await getElement(this.register_EmailInput,pEmail);
      await getElement(this.register_PhoneInput,pPhone);
      await getElement(this.register_PasswordInput,pPassword);
      await getElement(this.register_Confirmation_PasswordInput,pPassword_Confirmation);
     
      await getRadioGroupElement(this.radioGroupUserType, pRadioChoice);

      const [response] = await Promise.all([
      this.page.waitForResponse(resp =>
      resp.url().includes('api/register') 
      ),
      this.btn_register.click()
    ]);
      
      //await this.btn_register.click();
      
     
  }

  async goToUserProfile() : Promise<UserProfilePage> {
    await expect(this.page).toHaveURL(/.*profile/);
   
    return new UserProfilePage(this.page);
  }
}

