import { test as teardown } from '@playwright/test';
import { UserApi } from 'Playwright/api/UserApi';
import { deleteUser } from '../helper/auth.helper'; // Import your helper
import fs from 'fs';
import path from 'path';

// Ensure this matches the path in your playwright.config.ts
const dataFile = path.join(process.cwd(), 'playwright/.auth/user.json');

teardown('Cleanup: Delete setup user', async ({ request }) => {
  // 1. Read the data saved during setup
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile, 'utf-8');
    const userData = JSON.parse(rawData);

    // 2. Initialize the User API
    const userApi = new UserApi(request);

    console.log(`Cleaning up user: ${userData.username} (ID: ${userData.id})`);

    /** * 3. Use your helper function
     * userData.id and userData.token were saved in combinedData 
     * during your 'authenticate' setup.
     */
    try {
      await deleteUser(userApi, userData.id, userData.token);
      console.log('✅ User deleted successfully.');
    } catch (error) {
      console.error('❌ Failed to delete user during teardown:', error);
    }
  } else {
    console.warn('⚠️ No user data file found for cleanup.');
  }
});