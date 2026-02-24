import { test, expect } from "Playwright/fixtures/baseTest";
import { AuthApi } from "Playwright/api/AuthApi";
import { UserApi } from "Playwright/api/UserApi";
import { createUser, deleteUser } from "Playwright/helper/auth.helper";
import { validOtherOrgUser, validUser } from "Playwright/mockData/UserData";
import { User } from "Playwright/models/User";
import { assertElementofListElement } from "Playwright/helper/ui/uiDriverHelper.helper";


test.describe('User Authentication Flow', () => {
  let authApi: AuthApi;
  let userApi: UserApi;
  let orgUser: any; 
  let otherUserOrg : any;
  let currentUserData: any;

  // -----------------------------
  // Setup and Teardown
  // -----------------------------
  test.beforeEach(async ({ request }) => {
    authApi = new AuthApi(request);
    userApi = new UserApi(request);

    const id = `${Date.now()}_${test.info().workerIndex}_${crypto.randomUUID()}`;
    
    // Generate unique data for each specific test
    currentUserData = {
      ...validUser,
      email: `test_${Date.now()}_${Math.floor(Math.random() * 1000)}${id}@example.com`,
      username: `${id}${validUser.username}_${Math.floor(Math.random() * 1000)}`
    };

    // Register the user via API. 
    orgUser = await createUser(authApi, currentUserData as User);
    otherUserOrg = await createUser(authApi,validOtherOrgUser );
  });

  
  test.afterEach(async () => {
    const usersToDelete = [orgUser, otherUserOrg].filter(u => u?.id && u?.token);
    
    // Delete all Users after each test
    await Promise.all(
      usersToDelete.map(user => deleteUser(userApi, user.id, user.token))
    );
  });


  
  test.use({ storageState: { cookies: [], origins: [] } });
  test('Scenario: Successful login with valid credentials', async ({ userProfilePage, loginPage }) => {
    // Given: the user navigates to the profile login page
    await loginPage.navigate('/profile');

    // When: the user logs in with a valid email and password
    await loginPage.login(currentUserData.email, currentUserData.password);

    // Then: the profile dashboard should display the correct username
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
  });

  test.use({ storageState: { cookies: [], origins: [] } });
  test('Scenario: System displays validation errors for empty login fields', async ({ loginPage }) => {
    // Given: the user navigates to the profile login page
    await loginPage.navigate('/profile');

    // When: the user attempts to log in with both email and password empty
    await loginPage.login("bb", "bb");

    // Then: the system should display required field errors for both inputs
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_EMAIL);
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_PASSWORD);
  });
  
  test.use({ storageState: { cookies: [], origins: [] } });
  test('Scenario: System displays validation error for missing password', async ({ loginPage }) => {
    // Given: the user navigates to the profile login page
    await loginPage.navigate('/profile');

    // When: the user enters a valid email but leaves the password field empty
    await loginPage.login(currentUserData.email, "");

    // Then: the system should display a password requirement error
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_PASSWORD);
  });
   
  test.use({ storageState: { cookies: [], origins: [] } });
  test('Scenario: System displays validation error for missing email', async ({ loginPage }) => {
    // Given: the user navigates to the profile login page
    await loginPage.navigate('/profile');

    // When: the user enters a valid password but leaves the email field empty
    await loginPage.login("", currentUserData.password);

    // Then: the system should display an email requirement error
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_EMAIL);
  });

  test.use({ storageState: { cookies: [], origins: [] } });
  test('Scenario: System displays validation error for malformed email address', async ({ loginPage }) => {
    // Given: the user navigates to the profile login page
    await loginPage.navigate('/profile');

    // When: the user enters an email address with an invalid format
    await loginPage.login("BadFormatEmail.com", currentUserData.password);

    // Then: the system should display an invalid email format error
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_WRONGFORMAT_EMAIL);
  });

 test.use({ storageState: { cookies: [], origins: [] } });
    test('Scenario: System displays validation error for non-existent user credentials', async ({ loginPage }) => {
      // Given: the user navigates to the profile login page
      await loginPage.navigate('/profile');

      // When: the user enters a valid email format but the account doesn't exist
      await loginPage.login("thisUserDoesNotExist@example.com", "anyPassword123");

      // Then: the system should display an invalid credentials error
      await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_INVALID_CREDENTIELS);
  });

  test.use({ storageState: { cookies: [], origins: [] } });
  test('Scenario: System displays validation errors when required registration fields are empty', async ({ loginPage }) => {
    
    // Given: the user navigates to the profile registration page
    await loginPage.navigate('/profile');

    // When: the user submits the registration form with all required fields empty
    await loginPage.register("","","","","", "particulier");

    // Then: the system should display required field validation errors
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_EMAIL);
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_PASSWORD);
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_USERNAME);
    await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER_PHONE);
  });

  test.use({ storageState: { cookies: [], origins: [] } });
  test('Scenario: System displays validation error when passwords do not match', async ({ loginPage }) => {

    // Given: the user navigates to the profile registration page
    await loginPage.navigate('/profile');

    // When: the user enters two different passwords
    await loginPage.register(
      currentUserData.username,currentUserData.email,currentUserData.num_tel,
      currentUserData.password,"DifferentPassword",currentUserData.type_utilisateur
    );

    // Then: the system should display a password mismatch error
    await assertElementofListElement(
      loginPage.msgErrorEventName,
      loginPage.MSG_USER_NOT_SAME_PASSWORD
    );
  });

  test.use({ storageState: { cookies: [], origins: [] } });
  test('Scenario: System displays validation error when username already exists', async ({ loginPage }) => {

    // Given: the user navigates to the profile registration page
    await loginPage.navigate('/profile');
    
    // When: the user submits the form with a username that already exists
    await loginPage.register(
     otherUserOrg.username,`test3${Date.now()}@gmail.com`,currentUserData.num_tel,
      currentUserData.password,currentUserData.password,currentUserData.type_utilisateur
    );

    // Then: the system should display an existing username error
    await assertElementofListElement(
      loginPage.msgErrorEventName,
      loginPage.MSG_USER_EXIST_USERNAME + otherUserOrg.username
    );
  });

  test.use({ storageState: { cookies: [], origins: [] } });
    test('Scenario: System displays validation error when email already exists', async ({ loginPage }) => {
      
      // Given: the user navigates to the profile registration page
      await loginPage.navigate('/profile');
      
      // When: the user submits the form with a email that already exists
      await loginPage.register(
        `test3${Date.now()}`, otherUserOrg.email,
        currentUserData.num_tel,currentUserData.password,
        currentUserData.password, currentUserData.type_utilisateur
      );

      // Then: the system should display an existing username error
      await assertElementofListElement(loginPage.msgErrorEventName, loginPage.MSG_USER__EXIST_EMAIL + otherUserOrg.email );
  });
});





