import fs from 'fs';
import path from 'path';

export function getBrowserUserData(pBrowserName: string) {
    const dataFile = path.join(process.cwd(), `playwright/.auth/${pBrowserName}-user-data.json`);


    // 1. Check if file exists FIRST to avoid the catch block during setup
    if (!fs.existsSync(dataFile)) {
        // Silent during setup, only logs if we are actually running the main tests
        if (process.env.CI) {
            console.log(`Note: User data for ${pBrowserName} not yet available at ${dataFile}`);
        }
        return {}; // Return empty object so destructuring (e.g., const { email } = userData) doesn't crash
    }

    
    try {
        const data = fs.readFileSync(dataFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Failed to load user data for ${pBrowserName}:`, error);
        return null;
    }
}

// Use this in your tests
export const browserUsers = {
    chromium: () => getBrowserUserData('chromium'),
    firefox: () => getBrowserUserData('firefox'),
    edge: () => getBrowserUserData('edge'),
};