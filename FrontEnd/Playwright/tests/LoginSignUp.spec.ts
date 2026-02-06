import { test, expect } from "Playwright/fixtures/baseTest";
import { AuthApi } from "Playwright/api/AuthApi";
import { UserApi } from "Playwright/api/UserApi";
import { createUser, deleteUser } from "Playwright/helper/auth.helper";
import { validUser } from "Playwright/mockData/UserData";
import { User } from "Playwright/models/User";
import { LoginSignUpPage } from 'Playwright/pages/LoginSignUp';
import { UserProfilePage } from "Playwright/pages/UserProfilePage";
import { validEvent } from "Playwright/mockData/EventDats";

test.describe('Login Flow', () => {
  // 1. Move variables inside the describe so they are isolated per test run
  let authApi: AuthApi;
  let userApi: UserApi;
  let orgUser: any; // This stores the ID and Token from the API response
  let currentUserData: any; // This stores the email/password we generated

  test.beforeEach(async ({ request }) => {
    authApi = new AuthApi(request);
    userApi = new UserApi(request);

    // 2. Generate unique data for THIS specific test
    currentUserData = {
      ...validUser,
      email: `test_${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`,
      username: `${validUser.username}_${Math.floor(Math.random() * 1000)}`
    };

    // 3. Register the user via API. 
    // We cast as 'any' to bypass the missing 'update' property error.
    orgUser = await createUser(authApi, currentUserData as User);
  });

  test.afterEach(async ({ request }) => {
    // 4. Cleanup using the unique user's ID and token
    if (orgUser) {
      await deleteUser(userApi, orgUser.id, orgUser.token);
    }
  });

  /*test('User can login successfully', async ({ page }) => {
    const loginPage = new LoginSignUpPage(page);
    await loginPage.navigate('/profile');

    // IMPORTANT: Use currentUserData, NOT validUser
    await loginPage.login(currentUserData.email, currentUserData.password);

    const userProfilePage: UserProfilePage = await loginPage.goToUserProfile();
    
    // Verify the UI shows the unique username we generated
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
  });

  test('User can add Event successfully', async ({ page }) => {
    const loginPage = new LoginSignUpPage(page);
    await loginPage.navigate('/profile');
    
    // IMPORTANT: Use currentUserData
    await loginPage.login(currentUserData.email, currentUserData.password);

    const userProfilePage: UserProfilePage = await loginPage.goToUserProfile();
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);

    await userProfilePage.createEvent("Loll");
  });*/

  test('User can login successfully', async ({ userProfilePage, loginPage }) => {
    //const loginPage = new LoginSignUpPage(page);
    await loginPage.navigate('/profile');

    // IMPORTANT: Use currentUserData, NOT validUser
    await loginPage.login(currentUserData.email, currentUserData.password);

    //const userProfilePage: UserProfilePage = await loginPage.goToUserProfile();
    
    // Verify the UI shows the unique username we generated
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
  });

  test('User can add Event successfully', async ({ userProfilePage, loginPage }) => {
    //const loginPage = new LoginSignUpPage(page);
    await loginPage.navigate('/profile');
    
    // IMPORTANT: Use currentUserData
    await loginPage.login(currentUserData.email, currentUserData.password);

    //const userProfilePage: UserProfilePage = await loginPage.goToUserProfile();
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);

    await userProfilePage.createEvent(validEvent);
    await userProfilePage.msgErrorEventName.isVisible()
  });


});