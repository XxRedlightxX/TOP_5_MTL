import {  request, test as teardown } from '@playwright/test';
import { UserApi } from 'Playwright/api/UserApi';
import { deleteUser } from '../helper/auth.helper'; // Import your helper
import fs from 'fs';
import path from 'path';


/**
 * Global teardown function for Playwright tests.
 *
 * This function runs after all tests have finished and performs cleanup by:
 *   1. Reading all authentication and user-data files in the `playwright/.auth` directory.
 *   2. Deleting the corresponding users via API using `UserApi`.
 *   3. Removing the files from disk.
 *
 * It ensures that test users created during setup do not persist and avoids conflicts
 * for subsequent test runs.
 */
export default async function globalTeardown() {
  // Directory containing user auth and user-data files
  const authDir = path.join(process.cwd(), 'playwright/.auth');

  //filtering the dir ending with...
  const files = fs
    .readdirSync(authDir)
    .filter(f => f.endsWith('-user-data.json') || f.endsWith('-user.json'));

  // Create a new Playwright API request context
  const requestContext = await request.newContext({
    baseURL: process.env.APP_URL,
  });
  
  // Initialize the API helper
  const userApi = new UserApi(requestContext);

  for (const file of files) {
    const filePath = path.join(authDir, file);
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, 'utf-8');

    try {
      const userData = JSON.parse(raw);

       // Delete user via API if both id and token exist
      if (userData.id && userData.token) {
        await deleteUser(userApi, userData.id, userData.token);
      }

      // Delete the file (both storage state and user-data)
      fs.unlinkSync(filePath);
      
    } catch (err) {
      console.error(`Failed to delete ${file}`, err);
    }
  }

  await requestContext.dispose();
}


