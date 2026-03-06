import { test as setup, expect } from '../../fixtures/baseTest';
import { AuthApi } from '../../api/AuthApi';
import { createUser } from '../../helper/auth.helper';
import { validUser } from '../../mockData/UserData';
import fs from 'fs';
import path from 'path';

const authFile = 'playwright/.auth/edge-user.json';
const dataFile = 'playwright/.auth/edge-user-data.json';

setup('Edge-specific authentication', async ({ userProfilePage, loginPage, page, request }) => {
    console.log(' Setting up Edge browser...');
    
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
        email: `edge_${id}@example.com`, 
        username: `edge_user_${id}` 
    };
    
    // Create user via API
    const apiResponse = await createUser(new AuthApi(request), userInputs as any);
    
    // Perform UI login
    await loginPage.navigate('/profile');
    await loginPage.login(userInputs.email, userInputs.password);
    await expect(userProfilePage.profileUsername).toContainText(userInputs.username);
    
    // Save storage state in browser
    await page.context().storageState({ path: authFile });
    
      // Save user data into dataFile
    fs.writeFileSync(dataFile, JSON.stringify({ 
        ...apiResponse, 
        username: userInputs.username,
        browser: 'edge' 
    }));
    
    console.log(` Edge setup complete for: ${userInputs.username}`);
});