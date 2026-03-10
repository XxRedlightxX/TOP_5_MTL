import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { EventModal } from 'Playwright/models/Event';
import { clickElement, getDropdownElement, getElement, getStringElement, waitForResponseAfterClick } from 'Playwright/helper/ui/uiDriverHelper.helper';
import { invalidEvent, validEvent } from 'Playwright/mockData/EventData';

export class UserProfilePage extends BasePage {
  public readonly profileUsername: Locator;
  public readonly profileEvent_NameInput: Locator;
  public readonly profileEvent_StartDateInput: Locator;
  public readonly profileEvent_StartHourInput: Locator;
  public readonly profileEvent_DurationInput: Locator;
  public readonly profileEvent_LocationInput: Locator;
  public readonly profileEvent_DescriptionInput: Locator;
  public readonly profileEvent_DaytimeInput: Locator;
  public readonly profileEvent_SeasonInput: Locator;
  public readonly profileEvent_TypeInput: Locator;
  public readonly cartItems: Locator;

  public readonly msgErrorEventName: Locator;
  public readonly msgErrorEventCategory: Locator;

  public readonly MSG_SELECT_ITEM = "Please select an item in the list.";
  public readonly MSG_EVENT_TITRE = "Veuillez remplir ce champ."
  public readonly MSG_EVENT_DATE = "The date debut field must be a date after or equal to today.";

  public readonly btnPopUpEventWindow: Locator;
  public readonly btnCreateEvent: Locator;
  public readonly createModal: Locator;

  constructor(page: Page) {
    super(page);
    this.profileUsername = page.locator('.middle h2').first();
    this.btnPopUpEventWindow = page.getByTestId('add-event-icon');
    
    // Define the modal without the visibility filter here to prevent stale locator issues
    this.createModal = page.getByTestId('-created-event-modal');
    
    this.profileEvent_NameInput = this.createModal.getByTestId('-created-event-name');
    this.profileEvent_StartDateInput = this.createModal.getByTestId('-created-event-date');
    this.profileEvent_StartHourInput = this.createModal.getByTestId('-created-event-time');
    this.profileEvent_DurationInput = this.createModal.getByTestId('-created-event-duration');
    this.profileEvent_LocationInput = this.createModal.getByTestId('-created-event-location');
    this.profileEvent_DescriptionInput = this.createModal.getByTestId('-created-event-description');
    this.profileEvent_DaytimeInput = this.createModal.getByTestId('-created-event-daytime');
    this.profileEvent_SeasonInput = this.createModal.getByTestId('-created-event-type');
    this.profileEvent_TypeInput = this.createModal.getByTestId('-created-event-category');
    this.btnCreateEvent = this.createModal.getByTestId('btn-create-event');
    
    this.cartItems = page.locator(".glass .middle h2");
    this.msgErrorEventName = this.createModal.locator(".error");
    this.msgErrorEventCategory = this.createModal.locator("");
  }

  public async getMessageErrorAsync(isErrorVisible: boolean): Promise<string> {
    return isErrorVisible
      ? "Veuillez remplir ce champ."
      : "Please fill out this field.";
  }

  async fillEventFields(pEvent: EventModal, 
    pEventDayTime: number | null = null,
    pEventSeason: number | null = null,
    pEventType: number | null = null) {
    
    await clickElement(this.btnPopUpEventWindow);
    
    // Explicitly wait for the modal to be visible before interacting with children
    await this.createModal.filter({ visible: true }).waitFor({ state: 'visible' });

    let startDateorHour = getStringElement(pEvent.date_debut || invalidEvent.date_debut);
    
    await getElement(this.profileEvent_NameInput, pEvent.titre);
    await getElement(this.profileEvent_StartDateInput, startDateorHour[1]);
    await getElement(this.profileEvent_StartHourInput, startDateorHour[0]);
    await getElement(this.profileEvent_DurationInput, "3");
    await getElement(this.profileEvent_LocationInput, "3");
    await getElement(this.profileEvent_DescriptionInput, "3");
   
    await getDropdownElement(this.profileEvent_DaytimeInput, pEventDayTime);
    await getDropdownElement(this.profileEvent_SeasonInput, pEventSeason);
    await getDropdownElement(this.profileEvent_TypeInput, pEventType);
  }

  async createEvent(pEvent: EventModal) {
    await this.page.waitForLoadState('networkidle'); 
    await this.fillEventFields(pEvent, 1, 2, 1);
    await this.clickEvent();
  }

  async clickEvent() {
    await waitForResponseAfterClick(this.page, 'api/user/activite', this.btnCreateEvent);
  }
}