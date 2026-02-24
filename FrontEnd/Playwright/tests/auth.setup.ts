import { AuthApi } from 'Playwright/api/AuthApi';
import { expect, test as setup } from '../fixtures/baseTest';
import { createUser } from 'Playwright/helper/auth.helper';
import { validUser } from 'Playwright/mockData/UserData';
import fs from 'fs';
import path from 'path';

const authFile = 'playwright/.auth/user.json';
const dataFile = 'playwright/.auth/user_data.json'

/**
 * Global Setup: Authenticate and Save Session State
 * * This setup script prepares a fresh authenticated environment before tests run.
 * 1. Generates a unique user
 * 2. Performs a UI login to capture browser-side cookies/session storage
 * 3. Saves the session and user metadata to files for use in the test suite in json file
 **/
setup('authenticate', async ({ userProfilePage,loginPage, page, request }) => {
    const id = Date.now();
    const userInputs = { ...validUser, email: `test_${id}@example.com`, username: `user_${id}` };
    
    //  Create the user via API
    const apiResponse = await createUser(new AuthApi(request), userInputs as any);

    // Setup User credentials
    await loginPage.navigate('/profile'); 
    await loginPage.login(userInputs.email, userInputs.password); 

    //  Wait to ensure the login finished and cookies are set
    await expect(userProfilePage.profileUsername).toContainText(userInputs.username);

    //  Now save the cookies or local storage
    await page.context().storageState({ path: authFile });

    fs.mkdirSync(path.dirname(dataFile), { recursive: true });

    //  Save the metadata (username) for your test assertions in json file
    const combinedData = { ...apiResponse, username: userInputs.username };
    fs.writeFileSync(dataFile, JSON.stringify(combinedData));
});