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

        if (testInfo.project.name.toLowerCase().includes('edge')) {
        nameToLookup = 'edge';
        }

    // 1. Check if we are in a setup project
         const isSetup = testInfo.project.name.toLowerCase().includes('setup');

        const userData = getBrowserUserData(nameToLookup);
    
    // 2. ONLY throw the error if we AREN'T in setup.
    // In setup, we provide an empty object because we are about to create the data.
        if (!isSetup && (!userData || Object.keys(userData).length === 0)) {
            throw new Error(`❌ No user data found for: ${nameToLookup}. 
                Check playwright/.auth/ for ${nameToLookup}-user-data.json. 
                Current Project: ${testInfo.project.name}`);
        }
    
        if (userData?.username) {
            console.log(`✅ Loaded user data for ${testInfo.project.name}: ${userData.username}`);
        } else {
            console.log(`ℹ Running setup for ${testInfo.project.name}: providing empty userData.`);
        }

        await use(userData || {}); 
},
});

export { expect } from '@playwright/test';