import { test as base } from '@playwright/test';
import { LoginSignUpPage } from 'Playwright/pages/LoginSignUp';
import { UserProfilePage } from 'Playwright/pages/UserProfilePage';

type MyFixtures = {
    loginPage: LoginSignUpPage;
    userProfilePage: UserProfilePage;
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
});

export { expect } from '@playwright/test';