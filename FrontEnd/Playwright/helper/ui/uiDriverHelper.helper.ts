import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from 'Playwright/pages/BasePage';

export async function getElement(pLocator : Locator, pInput : string) {
    await pLocator.waitFor({state : 'visible'})
    await pLocator.clear();
    await pLocator.fill(pInput);
}

export function getStringElement(pInput : string)  : string[]{
    const [date, time] = pInput.split(" ");
    const hour = time.split(":").slice(0, 2).join(":");
    return [hour, date];
}

export async function getDropdownElement(pLocator : Locator, pInput : number) {
    await pLocator.waitFor({state : 'visible'})
    await pLocator.selectOption({index : pInput})
}

export async function assertElementofListElement(pListLocator : Locator, pText : string) {
    await pListLocator.waitFor({state : 'visible'})
    await pListLocator.filter({ hasText: pText  });

    await expect(pListLocator).toContainText(pText)
     
};





