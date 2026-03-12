import { test as setup, expect } from '../../fixtures/baseTest';
import { AuthApi } from '../../api/AuthApi';
import { createUser } from '../../helper/auth.helper';
import { validUser } from '../../mockData/UserData';
import fs from 'fs';
import path from 'path';

const authFile = 'playwright/.auth/firefox-user.json';
const dataFile = 'playwright/.auth/firefox-user-data.json';

setup('Firefox-specific authentication', async ({ userProfilePage, loginPage, page, request }) => {
    console.log(' Setting up Firefox browser...');
    
    // Ensure directory exists
    const dir = path.dirname(authFile);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
           
    // if file already exists remove old state of that file
    if (fs.existsSync(authFile)) { fs.unlinkSync(authFile); }
    if (fs.existsSync(dataFile)) { fs.unlinkSync(dataFile); }
    
    const id = Date.now();
    const userInputs = { 
        ...validUser, 
        email: `firefox_${id}@example.com`, 
        username: `firefox_user_${id}` 
    };
    
    // Create user via API
    const apiResponse = await createUser(new AuthApi(request), userInputs as any);
    
    // Perform UI login
    await loginPage.navigate('/profile');
    await loginPage.login(userInputs.email, userInputs.password);
    await expect(userProfilePage.profileUsername).toContainText(userInputs.username);
    
    // Save storage state in browser
    await page.context().storageState({ path: authFile });
    
    fs.writeFileSync(dataFile, JSON.stringify({ 
        ...apiResponse, 
        username: userInputs.username,
        browser: 'firefox' 
    }));
    
    console.log(`✅ Firefox setup complete for: ${userInputs.username}`);
});