import { test as base } from '@playwright/test';
import { LoginSignUpPage } from 'Playwright/pages/LoginSignUp';
import { UserProfilePage } from 'Playwright/pages/UserProfilePage';

// 1. Define the "types" for your fixtures so TypeScript knows what's available
type MyFixtures = {
    loginPage: LoginSignUpPage;
    userProfilePage: UserProfilePage;
};

// 2. Extend the base 'test' to create your own "Manager"
export const test = base.extend<MyFixtures>({

    page: async ({ browser }, use) => {
        const context = await browser.newContext(); 
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
    
    // This fixture creates the LoginPage and hands it to the test
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginSignUpPage(page);
        await use(loginPage);
        // Any code here runs AFTER the test finishes (Cleanup)
    },

    // This fixture creates the DashboardPage
     userProfilePage: async ({ page }, use) => {
        const dashboardPage = new UserProfilePage(page);
        await use(dashboardPage);
    },
});

// Export the 'expect' utility from the base, so you only need to import from this file
export { expect } from '@playwright/test';