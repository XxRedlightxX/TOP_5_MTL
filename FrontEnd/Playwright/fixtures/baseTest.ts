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
        let nameToLookup = browserName;

        // If the project name is "Microsoft Edge", use "edge" to find the file
        if (testInfo.project.name.toLowerCase().includes('edge')) {
            nameToLookup = 'edge';
        }

        const userData = getBrowserUserData(nameToLookup);
        
        if (!userData) {
            throw new Error(`No user data found for: ${nameToLookup}. 
                Check playwright/.auth/ for ${nameToLookup}-user-data.json`);
        }
        
        console.log(`Loaded user data for ${testInfo.project.name}: ${userData.username}`);
        await use(userData);
    },
});

export { expect } from '@playwright/test';