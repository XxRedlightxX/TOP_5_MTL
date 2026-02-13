import { test, expect } from "Playwright/fixtures/baseTest";
import { AuthApi } from "Playwright/api/AuthApi";
import { UserApi } from "Playwright/api/UserApi";
import { createUser, deleteUser } from "Playwright/helper/auth.helper";
import { validUser } from "Playwright/mockData/UserData";
import { User } from "Playwright/models/User";
import { emptyEvent, invalidEventDate, invalidEventTitle, validEvent } from "Playwright/mockData/EventDats";
import { assertElementofListElement, assertToolTipElement } from "Playwright/helper/ui/uiDriverHelper.helper";
;
test.describe('Login Flow', () => {
 
  let authApi: AuthApi;
  let userApi: UserApi;
  let orgUser: any; 
  let currentUserData: any; 

  test.beforeEach(async ({ request }) => {
    authApi = new AuthApi(request);
    userApi = new UserApi(request);

    const id = `${Date.now()}_${test.info().workerIndex}_${crypto.randomUUID()}`;
    
    // Generate unique data for THIS specific test
    currentUserData = {
      ...validUser,
      email: `test_${Date.now()}_${Math.floor(Math.random() * 1000)}${id}@example.com`,
      username: `${id}${validUser.username}_${Math.floor(Math.random() * 1000)}`
    };

    // 3. Register the user via API. 
    // We cast as 'any' to bypass the missing 'update' property error.
    orgUser = await createUser(authApi, currentUserData as User);
  });

  test.afterEach(async () => {
    // 4. Cleanup using the unique user's ID and token
    if (orgUser) {
      await deleteUser(userApi, orgUser.id, orgUser.token);
    }
  });



test.afterEach(async ({}, testInfo) => {
  
    const summary = `Automated test failed: ${testInfo.title}`;
    const description = `Test failed at ${new Date().toISOString()}\n\nError: ${testInfo.error?.message}`;
    //console.log(await createJiraIssue(summary, description));

});

  /*test('User can login succyessfully', async ({ page }) => {
    const loginPage = new LoginSignUpPage(page);
    await loginPage.navigate('/profile');

    // IMPORTANT: Use currentUserData, NOT validUser
    await loginPage.login(currentUserData.email, currentUserData.password);

    const userProfilePage: UserProfilePage = await loginPage.goToUserProfile();
    
    // Verify the UI shows the unique username we generated
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
  });*/

  /*test('User can add Eventy successfully', async ({ page }) => {
    const loginPage = new LoginSignUpPage(page);
    await loginPage.navigate('/profile');
    
    // IMPORTANT: Use currentUserData
    await loginPage.login(currentUserData.email, currentUserData.password);

    const userProfilePage: UserProfilePage = await loginPage.goToUserProfile();
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);

    await userProfilePage.createEvent(validEvent);
  });*/

  test('Successful login with valid credentials', async ({ userProfilePage, loginPage }) => {
    
    // Given: the user navigates to the profile login page
    await loginPage.navigate('/profile');

    // When: the user logs in with a valid email and password
    // Using currentUserData ensures we are testing against the specific user session
    await loginPage.login(currentUserData.email, currentUserData.password);

    // Then: the profile dashboard should display the correct username
    // Increased timeout to 60s as a safeguard for slow redirects
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
  });


  test('Scenario: User attempts to create an event with missing event title', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    await loginPage.login(currentUserData.email, currentUserData.password);

   // And: The user is on the User Profile dashboard (Assertion to confirm state)
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
    
    // When: The user attempts to create a new event
    await userProfilePage.fillEventFields(invalidEventTitle,1,1,1);
    
    const msg = await userProfilePage.getMessageErrorAsync(await userProfilePage.msgErrorEventName.isVisible());
    // Then: An error message "The titre field is required." should be displayed
    // Setting 60s timeout as requested previously to ensure the message has time to appear
   assertToolTipElement(userProfilePage.profileEvent_NameInput, msg);
  });

   test('Scenario: User attempts to create an event with missing category information', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    await loginPage.login(currentUserData.email, currentUserData.password);

   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
    
  // When: The user attempts to create a new event without selecting a category
    // Note: pEventType is omitted (null) to trigger the browser validation
    await userProfilePage.fillEventFields(validEvent,1,1);

    // And: The user clicks the submit button
    await userProfilePage.btnCreateEvent.click();
    // Then: A browser tooltip should appear on the Category input
    assertToolTipElement(userProfilePage.profileEvent_TypeInput, userProfilePage.MSG_SELECT_ITEM)
    
  });

 


   test('Scenario: User attempts to create an event with all fields empty', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    await loginPage.login(currentUserData.email, currentUserData.password);

   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
    
  // When: The user attempts to create a new event leaving all fields empty
    await userProfilePage.fillEventFields(emptyEvent);

    // And: The user clicks the submit button
    await userProfilePage.btnCreateEvent.click();
   const msg = await userProfilePage.getMessageErrorAsync(await userProfilePage.msgErrorEventName.isVisible());
    // Then: A browser tooltip should appear on the first required input (Title)
    assertToolTipElement(userProfilePage.profileEvent_NameInput, msg)
  });

  test('Scenario: User attempts to create an event with a duplicate title', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    await loginPage.login(currentUserData.email, currentUserData.password);

    
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
    
    // And: An event with a specific title already exists
    // (We create it the first time)
    await userProfilePage.createEvent(validEvent);
    await userProfilePage.createEvent(validEvent);
    
    // Then: An error message "An activity with this name already exists." should be displayed
    await expect(userProfilePage.msgErrorEventName).toContainText("An activity with this name already exists.")
  });

  test('Scenario: Successful creation of a new event', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    await loginPage.login(currentUserData.email, currentUserData.password);

    
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
    
    // When: The user creates a new event with valid information
    await userProfilePage.createEvent(validEvent);
   
    
    // Then: The event should be visible in the user's activity list
    await assertElementofListElement(userProfilePage.cartItems,validEvent.titre)
  });



  test('Scenario: User attempts to create an event with non valid date', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    await loginPage.login(currentUserData.email, currentUserData.password);

    
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(currentUserData.username);
    
    // When: The user creates a new event with valid information
    
    await userProfilePage.fillEventFields(invalidEventDate,1,1,1);
    await userProfilePage.btnCreateEvent.click();

    // Then: The event should be visible in the user's activity list
    await expect(userProfilePage.msgErrorEventName).toContainText(userProfilePage.MSG_EVENT_DATE)
  });




});