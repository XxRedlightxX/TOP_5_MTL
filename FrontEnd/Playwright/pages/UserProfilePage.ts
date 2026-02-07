import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { EventModal, EventPayload } from 'Playwright/models/EventModal';
import { assertElementofListElement, getDropdownElement, getElement, getStringElement } from 'Playwright/helper/ui/uiDriverHelper.helper';
import { validEvent } from 'Playwright/mockData/EventDats';
export class UserProfilePage extends BasePage {
  public readonly profileUsername: Locator;
  
  public readonly  profileEvent_NameInput: Locator;
  public readonly  profileEvent_StartDateInput: Locator;
  public readonly  profileEvent_StartHourInput: Locator;
  public readonly  profileEvent_DurationInput: Locator;
  public readonly  profileEvent_LocationInput: Locator;
  public readonly  profileEvent_DescriptionInput: Locator;
  public readonly  profileEvent_DaytimeInput: Locator;
  public readonly  profileEvent_SeasonInput: Locator;
  public readonly  profileEvent_TypeInput: Locator;

   public readonly cartItems: Locator;

   public readonly msgErrorEventName : Locator;
  
  public readonly btnPopUpEventWindow: Locator;
  public readonly btnCreateEvent: Locator;

  constructor(page: Page) {
    super(page);
    this.profileUsername = page.locator('.middle h2').first();
    this.btnPopUpEventWindow = page.getByTestId('add-event-icon');
    const createModal = page.locator('#myModal').filter({ visible: true });
    this.profileEvent_NameInput = createModal.getByTestId('-created-event-name');
    this.profileEvent_StartDateInput = createModal.getByTestId('-created-event-date');
    this.profileEvent_StartHourInput = createModal.getByTestId('-created-event-time');
    this.profileEvent_DurationInput = createModal.getByTestId('-created-event-duration');
    this.profileEvent_LocationInput = createModal.getByTestId('-created-event-location');
    this.profileEvent_DescriptionInput = createModal.getByTestId('-created-event-description');
    this.profileEvent_DaytimeInput = createModal.getByTestId('-created-event-daytime');
     this.profileEvent_SeasonInput = createModal.getByTestId('-created-event-type');
    this.profileEvent_TypeInput = createModal.getByTestId('-created-event-category');
    this.btnCreateEvent = createModal.getByTestId('btn-create-event');
    this.cartItems = page.locator(".glass .middle h2");
    this.msgErrorEventName = createModal.locator(".error");




  }

  async createEvent(pEvent: EventModal) {
    // 1. Click the add icon
    await this.btnPopUpEventWindow.click();

    // 2. Define the locator for the input INSIDE the visible modal
    // This solves the "resolved to 3 elements" error
   
    let startDateorHour = getStringElement(validEvent.date_debut)


    await getElement(this.profileEvent_NameInput, pEvent.titre);
    await getElement(this.profileEvent_StartDateInput, startDateorHour[1]);
    await getElement(this.profileEvent_StartHourInput, startDateorHour[0]);
    await getElement(this.profileEvent_DurationInput, "3");
    await getElement(this.profileEvent_LocationInput, "3");
    await getElement(this.profileEvent_DescriptionInput, "3");
    //await getElement(this.profileEvent_DaytimeInput, "3");
    await getDropdownElement(this.profileEvent_DaytimeInput, 1);
    await getDropdownElement(this.profileEvent_SeasonInput, 2);
    await getDropdownElement(this.profileEvent_TypeInput, 1);

    await this.btnCreateEvent.click();
    //await assertElementofListElement(this.cartItems,pEvent.titre)
    
    // This will fail the test if the field is still empty, 
    // giving you a clear error message.
    //await expect(this.profileEvent_NameInput).toHaveValue(pEvent.titre);
}

    
}
