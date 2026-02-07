
import { test as setup } from '../fixtures/baseTest'; // Import your custom fixture

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ loginPage, page }) => {
    await page.goto('/login');
    
    // Use the fixture directly!
    await loginPage.login('user@laravel.com', 'password123');
    
    // Save the state for all other tests
    await page.context().storageState({ path: authFile });
});