import { test, expect } from "Playwright/fixtures/baseTest";;
import { emptyEvent, invalidEventDate, invalidEventTitle, validEvent } from "Playwright/mockData/EventData";
import { assertElementofListElement, assertToolTipElement } from "Playwright/helper/ui/uiDriverHelper.helper";

const TIMEOUT_SEC = 30000;


test.describe('Event Creation Flow', () => {

  test('Scenario: User attempts to create an event with missing event title', async ({ userProfilePage, loginPage,userData }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');

   // And: The user is on the User Profile dashboard (Assertion to confirm state)
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: TIMEOUT_SEC });
    
    // When: The user attempts to create a new event
    await userProfilePage.fillEventFields(invalidEventTitle,1,1,1);
    await userProfilePage.btnCreateEvent.click();
    
    const msg = await userProfilePage.getMessageErrorAsync(await userProfilePage.msgErrorEventName.isVisible());
    
    // Then: An error message "The titre field is required." should be displayed
   await assertToolTipElement(userProfilePage.profileEvent_NameInput, msg);
  });

  test('Scenario: User attempts to create an event with missing category information', async ({ userProfilePage, loginPage,userData }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');

    // Navigate directly to profile page
    const uniqueEvent = { ...validEvent, titre: `Event_${Date.now()}_${Math.random()}` } as any;

    // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: TIMEOUT_SEC  });
    
    // When: The user attempts to create a new event without selecting a category
    await userProfilePage.fillEventFields(uniqueEvent,1,1);
    await userProfilePage.btnCreateEvent.click();

    // Then: A browser tooltip should appear on the Category input
    await assertToolTipElement(userProfilePage.profileEvent_TypeInput, userProfilePage.MSG_SELECT_ITEM)
  });

   test('Scenario: User attempts to create an event with all fields empty', async ({  userProfilePage, loginPage,userData }) => {
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: TIMEOUT_SEC  });
    
    // When: The user attempts to create a new event leaving all fields empty
    await userProfilePage.fillEventFields(emptyEvent);
    await userProfilePage.btnCreateEvent.click();

    const msg = await userProfilePage.getMessageErrorAsync(await userProfilePage.msgErrorEventName.isVisible());
    
    // Then: A browser tooltip should appear on the first required input (Title)
    await assertToolTipElement(userProfilePage.profileEvent_NameInput, msg)
  });

  test('Scenario: User attempts to create an event with a duplicate title', async ({ userProfilePage, loginPage,userData}) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    const uniqueEvent = { ...validEvent, titre: `Event_${Date.now()}_${Math.random()}` } as any;
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: TIMEOUT_SEC  });
    
    // And: An event with a specific title already exists
    await userProfilePage.createEvent(uniqueEvent);
    await userProfilePage.createEvent(uniqueEvent);
    
    // Then: An error message "An activity with this name already exists." should be displayed
    await expect(userProfilePage.msgErrorEventName).toContainText("An activity with this name already exists.")
  });

  test('Scenario: Successful creation of a new event', async ({  userProfilePage, loginPage,userData}) => {
  const uniqueEvent = { ...validEvent, titre: `Event_${Date.now()}_${Math.random()}` } as any;
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');

   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: TIMEOUT_SEC  });
    
    // When: The user creates a new event with valid information
    await userProfilePage.createEvent(uniqueEvent);

    // Then: The event should be visible in the user's activity list
    await assertElementofListElement(userProfilePage.cartItems,uniqueEvent.titre)
  });

  test('Scenario: User attempts to create an event with non valid date', async ({  userProfilePage, loginPage,userData,browserName, }) => {
  
    // Given: The user is logged into their profile page
    await loginPage.navigate('/profile');
    
   // And: The user is on the User Profile dashboard
    await expect(userProfilePage.profileUsername).toContainText(userData.username, { timeout: TIMEOUT_SEC  });
    
    // When: The user creates a new event with valid information
    await userProfilePage.fillEventFields(invalidEventDate,1,1,1);
    await userProfilePage.clickEvent();

    // Then: The event should be visible in the user's activity list
    await expect(userProfilePage.msgErrorEventName).toContainText(userProfilePage.MSG_EVENT_DATE)
  });

  });
