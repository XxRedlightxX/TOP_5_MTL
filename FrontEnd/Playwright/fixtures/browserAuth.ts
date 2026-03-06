import fs from 'fs';
import path from 'path';

export function getBrowserUserData(pBrowserName: string) {
    const dataFile = path.join(process.cwd(), `playwright/.auth/${pBrowserName}-user-data.json`);
    
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