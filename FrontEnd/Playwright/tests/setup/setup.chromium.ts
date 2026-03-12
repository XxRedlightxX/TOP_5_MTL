import { test as setup, expect } from '../../fixtures/baseTest';
import { AuthApi } from '../../api/AuthApi';
import { createUser } from '../../helper/auth.helper';
import { validUser } from '../../mockData/UserData';
import fs from 'fs';
import path from 'path';

const authFile = 'playwright/.auth/chromium-user.json';
const dataFile = 'playwright/.auth/chromium-user-data.json';

setup('Chromium-specific authentication', async ({ userProfilePage, loginPage, page, request }) => {
    console.log(' Setting up Chromium browser...');
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    
    // if file already exists remove old state of that file
    if (fs.existsSync(authFile)) {
        fs.unlinkSync(authFile);
        return;
    }
    
    const id = Date.now();
    const userInputs = { 
        ...validUser, 
        email: `chromium_${id}@example.com`, 
        username: `chromium_user_${id}` 
    };
    
    // Create user via API
    const apiResponse = await createUser(new AuthApi(request), userInputs as any);
    
    // Perform UI login
    await loginPage.navigate('/profile');
    await loginPage.login(userInputs.email, userInputs.password);
    await expect(userProfilePage.profileUsername).toContainText(userInputs.username);
    
    //Save storage state in browser
    await page.context().storageState({ path: authFile });
    
    // Save user data on file 
    fs.writeFileSync(dataFile, JSON.stringify({ 
        ...apiResponse, 
        username: userInputs.username,
        browser: 'chromium' 
    }));
    
    console.log(` Chromium setup complete for: ${userInputs.username}`);
});