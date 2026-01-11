// tests/login.spec.ts
import {test, expect} from "@playwright/test"
import { LoginSignUpPage } from 'Playwright/pages/LoginSignUp';


test('User can login successfully', async ({ page,  }) => {
  const loginPage = new LoginSignUpPage(page);
  await loginPage.navigate('/profile');
  //await loginPage.login('testuser', 'password123');

 
});