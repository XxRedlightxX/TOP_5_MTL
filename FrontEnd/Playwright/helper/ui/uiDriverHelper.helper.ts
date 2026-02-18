import {  Locator, expect } from '@playwright/test';

/**
 * Enum for user roles in the system.
 */
export enum UserRole  {
    ORG_USER = "organisateur",
    NORMAL_USER= "particulier",
}


/**
 * Fills an input element safely, ensuring Vue v-model has synced.
 *
 * @param {Locator} pLocator - The Playwright locator for the input field.
 * @param {string} pInput - The value to type into the field.
 */
export async function getElement(pLocator: Locator, pInput: string) {
    // Ensure we are looking at the visible one (prevents strict mode errors)
    const target = pLocator.filter({ visible: true });

    //  Wait for it to be ready
    await target.waitFor({ state: 'visible' });

    // Clear and Fill
    await target.clear();
    await target.fill(pInput);

    // 4. THE FIX: Wait for the value to be reflected
    // This ensures the v-model has finished its "sync"
    await expect(target).toHaveValue(pInput);
}

/**
 * Splits a date-time string into [hour, date].
 *
 * @param {string} pInput - A string in the format "YYYY-MM-DD HH:MM:SS".
 * @returns {string[]} Array where [0] = "HH:MM", [1] = "YYYY-MM-DD".
 */
export function getStringElement(pInput : string)  : string[]{
    const [date, time] = pInput.split(" ");
    const hour = time.split(":").slice(0, 2).join(":");
    return [hour, date];
}

/**
 * Selects an option from a dropdown by index.
 *
 * @param {Locator} pLocator - Locator of the <select> element.
 * @param {number | null} pInput - Index of the option to select. If null, function returns immediately.
 */
export async function getDropdownElement(pLocator : Locator, pInput : number | null = null) {
    if (pInput === null) return;

    await pLocator.waitFor({state : 'visible'})
    await pLocator.selectOption({index : pInput})
}

/**
 * Clicks a radio button in a group and ensures it's checked.
 *
 * @param {Locator} pLocator - Locator for the radio group container.
 * @param {string} pInput - The label text of the radio button to select.
 */
export async function getRadioGroupElement(pLocator: Locator, pInput: string) {
    if (!pInput) return;
     
    // 1. Target the visible group
    const visibleGroup = pLocator.filter({ visible: true });

    // 2. Wait for the group to be ready
    await visibleGroup.waitFor({ state: 'visible' });

    // 3. Find the specific radio option by its label
    // Using { exact: false } handles case sensitivity (e.g., "Particulier" vs "particulier")
    const radioOption = visibleGroup.getByLabel(pInput, { exact: false });

    // 4. Perform the click
    await radioOption.click();

    // 5. THE FIX: Verify it is checked
    // This forces Playwright to wait until the Vue state (v-model) is updated
    await expect(radioOption).toBeChecked();
}

/**
 * Asserts that a list element with specific text exists and is visible.
 *
 * @param {Locator} pListLocator - Locator for the list container or collection of elements.
 * @param {string} pText - The text that should appear in one of the elements.
 * @param {string} [title] - Optional: additional text to assert (currently commented out in code).
*/
export async function assertElementofListElement(pListLocator : Locator, pText : string,  title?: string) {
    const specificItem = pListLocator.filter({ hasText: pText }).first();

    // Wait for the element to appear in DOM
    await specificItem.waitFor({ state: 'visible', timeout: 20000 });

    // 3. Assert it contains the text
    await expect(specificItem).toBeVisible();
    //await expect(specificItem).toContainText(title);
};

/**
 * Checks the HTML5 validation message of an input element 
 *
 * @param {Locator} pLocator - Locator for the input element.
 * @param {string} expectedMessage - The expected validation message text.
 */
export async function assertToolTipElement(pLocator: Locator, expectedMessage: string) {
    const validationMessage = await pLocator.evaluate((el: HTMLInputElement) => el.validationMessage);
    // Use expect so the test fails if the message is wrong
    expect(validationMessage).toBe(expectedMessage);
}







