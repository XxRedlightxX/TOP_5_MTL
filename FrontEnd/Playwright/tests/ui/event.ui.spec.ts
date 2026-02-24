 import { test, expect } from "Playwright/fixtures/baseTest";;
 import { emptyEvent, invalidEventDate, invalidEventTitle, validEvent } from "Playwright/mockData/EventData";
 import { assertElementofListElement, assertToolTipElement } from "Playwright/helper/ui/uiDriverHelper.helper";
import fs from 'fs';


//const userData = JSON.parse(fs.readFileSync('playwright/.auth/user_data.json', 'utf-8'));

test.describe('Event Creation Flow', () => {

  let userData: any;

  test.beforeAll(() => {
  userData = JSON.parse(fs.readFileSync('playwright/.auth/user_data.json', 'utf-8'));
})


  test('Scenario: User attempts to create an event with missing event title', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    //await loginPage.login(currentUserData.email, currentUserData.password);

   // And: The user is on the User Profile dashboard (Assertion to confirm state)
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: 15000 });
    
    // When: The user attempts to create a new event
    await userProfilePage.fillEventFields(invalidEventTitle,1,1,1);
    
    const msg = await userProfilePage.getMessageErrorAsync(await userProfilePage.msgErrorEventName.isVisible());
    
    // Then: An error message "The titre field is required." should be displayed
    // Setting 60s timeout as requested previously to ensure the message has time to appear
   await assertToolTipElement(userProfilePage.profileEvent_NameInput, msg);
  });

  test('Scenario: User attempts to create an event with missing category information', async ({ userProfilePage, loginPage, page }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');

    // Navigate directly to profile page
    const uniqueEvent = { ...validEvent, titre: `Event_${Date.now()}_${Math.random()}` } as any;

    // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: 15000 });
    
    // When: The user attempts to create a new event without selecting a category
    await userProfilePage.fillEventFields(uniqueEvent,1,1);

    // And: The user clicks the submit button
    await userProfilePage.btnCreateEvent.click();

    // Then: A browser tooltip should appear on the Category input
    await assertToolTipElement(userProfilePage.profileEvent_TypeInput, userProfilePage.MSG_SELECT_ITEM)
  });

 


   test('Scenario: User attempts to create an event with all fields empty', async ({ userProfilePage, loginPage }) => {
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: 15000 });
    
    // When: The user attempts to create a new event leaving all fields empty
    await userProfilePage.fillEventFields(emptyEvent);

    // And: The user clicks the submit button
    await userProfilePage.btnCreateEvent.click();

    const msg = await userProfilePage.getMessageErrorAsync(await userProfilePage.msgErrorEventName.isVisible());
    
    // Then: A browser tooltip should appear on the first required input (Title)
    await assertToolTipElement(userProfilePage.profileEvent_NameInput, msg)
  });

  test('Scenario: User attempts to create an event with a duplicate title', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    const uniqueEvent = { ...validEvent, titre: `Event_${Date.now()}_${Math.random()}` } as any;
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: 15000 });
    
    // And: An event with a specific title already exists
    await userProfilePage.createEvent(uniqueEvent);
    await userProfilePage.createEvent(uniqueEvent);
    
    // Then: An error message "An activity with this name already exists." should be displayed
    await expect(userProfilePage.msgErrorEventName).toContainText("An activity with this name already exists.")
  });

  test('Scenario: Successful creation of a new event', async ({ userProfilePage, loginPage }) => {
  const uniqueEvent = { ...validEvent, titre: `Event_${Date.now()}_${Math.random()}` } as any;
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');

   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username);
    
    // When: The user creates a new event with valid information
    await userProfilePage.createEvent(uniqueEvent);

    // Then: The event should be visible in the user's activity list
    await assertElementofListElement(userProfilePage.cartItems,uniqueEvent.titre)
  });



  test('Scenario: User attempts to create an event with non valid date', async ({ userProfilePage, loginPage }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username);
    
    // When: The user creates a new event with valid information
    await userProfilePage.fillEventFields(invalidEventDate,1,1,1);
    await userProfilePage.btnCreateEvent.click();

    // Then: The event should be visible in the user's activity list
    await expect(userProfilePage.msgErrorEventName).toContainText(userProfilePage.MSG_EVENT_DATE)
  });

  });
