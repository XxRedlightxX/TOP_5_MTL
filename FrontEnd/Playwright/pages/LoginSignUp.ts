// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserProfilePage } from './UserProfilePage';
import { clickElement, getElement, getRadioGroupElement, UserRole, waitForResponseAfterClick } from 'Playwright/helper/ui/uiDriverHelper.helper';

export class LoginSignUpPage extends BasePage {
  public readonly login_UsernameInput: Locator;
  public readonly login_PasswordInput: Locator;
 
  public readonly register_UsernameInput : Locator;
  public readonly register_EmailInput : Locator;
  public readonly register_PhoneInput : Locator;
  public readonly register_PasswordInput : Locator;
  public readonly register_Confirmation_PasswordInput : Locator;

  public readonly btn_register : Locator;
  public readonly btn_toggleAuth : Locator;
  public readonly btn_login: Locator;
  
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
    this.login_UsernameInput = page.getByTestId('login-email-input').locator('input');
    this.login_PasswordInput = page.getByTestId('login-password-input').locator('input');
    this.btn_login = page.getByTestId('btn-sign-in')
    this.btn_toggleAuth = page.getByTestId("toggle-auth-mode").filter({ visible: true });
    this.register_UsernameInput = page.getByTestId("register-username-input").locator('input');
    this.register_EmailInput = page.getByTestId("register-email-input").locator('input');
    this.register_PhoneInput = page.getByTestId("register-phone-input").locator('input');
    this.register_PasswordInput = page.getByTestId("register-password-input").locator('input');
    this.register_Confirmation_PasswordInput = page.getByTestId("register-password_confirmation-input").locator('input');
    this.btn_register = page.getByTestId("btn-new-register").first();
    this.btn_toggleAuth = page.getByTestId("toggle-auth-mode").filter({ visible: true }).first()
    this.msgErrorEventName = page.locator(".error");
    this.radioGroupUserType = page.getByTestId("user-type-group");
  }

  async login(pUsername: string, pPassword: string) {
    //Fills the form fields
    await getElement(this.login_UsernameInput,pUsername);
    await getElement(this.login_PasswordInput,pPassword);

    
    // Wait for Api response and then click
    await waitForResponseAfterClick(this.page, 'api/login', this.btn_login);
    await this.page.waitForLoadState('networkidle');
  }

  async register(
      pUsername: string, pEmail: string,pPhone: string,
      pPassword: string, pPassword_Confirmation, pRadioChoice : string
    ) {
      await this.page.waitForLoadState('networkidle'); 
      await clickElement(this.btn_toggleAuth);

      //Fills the fields
      await getElement(this.register_UsernameInput,pUsername);
      await getElement(this.register_EmailInput,pEmail);
      await getElement(this.register_PhoneInput,pPhone);
      await getElement(this.register_PasswordInput,pPassword);
      await getElement(this.register_Confirmation_PasswordInput,pPassword_Confirmation);
      await getRadioGroupElement(this.radioGroupUserType, pRadioChoice);
      
    // Waits for Api response and then click
      await waitForResponseAfterClick(this.page, 'api/register', this.btn_register);
  }

  async goToUserProfile() : Promise<UserProfilePage> {
    await expect(this.page).toHaveURL(/.*profile/);
    return new UserProfilePage(this.page);
  }
}

