import { test as base } from '@playwright/test';
import { LoginSignUpPage } from 'Playwright/pages/LoginSignUp';
import { UserProfilePage } from 'Playwright/pages/UserProfilePage';
import { getBrowserUserData } from './browserAuth';

type MyFixtures = {
    loginPage: LoginSignUpPage;
    userProfilePage: UserProfilePage;
    userData: any; 
};

export const test = base.extend<MyFixtures>({
    // REMOVE the 'page' fixture override entirely. 
    // Let Playwright handle it so storageState works!

    loginPage: async ({ page }, use) => {
        await use(new LoginSignUpPage(page));
    },

    userProfilePage: async ({ page }, use) => {
        await use(new UserProfilePage(page));
    },
    
    userData: async ({ browserName }, use, testInfo) => {
    // We return a function that the test calls to get the data
    const getData = () => {
        let nameToLookup = browserName;
        if (testInfo.project.name.toLowerCase().includes('edge')) nameToLookup = 'edge';
        
        const data = getBrowserUserData(nameToLookup);
        
        // Only throw if we are NOT in a setup test
        if (!testInfo.project.name.includes('setup') && (!data || !data.username)) {
            throw new Error(`❌ Required auth data missing for ${nameToLookup}`);
        }
        return data || {};
    };

    await use(getData()); // If you want to keep the current usage, or pass getData if you want lazy loading
},
});

export { expect } from '@playwright/test';