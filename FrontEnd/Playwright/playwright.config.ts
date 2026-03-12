import { defineConfig, devices } from '@playwright/test';
require('dotenv').config({ path: '.env' });
import path from 'path';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */


// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  /*Timeout 50 sec */
  timeout: 50000,

  globalTeardown : './tests/global.teardown.ts',

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [
    ['html'],
    ['list'],
     [path.join(__dirname, 'reporters/jira-reporter.ts')]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
     baseURL: process.env.APP_URL  ,
      locale: 'en-US',
      timezoneId: 'America/New_York',
      navigationTimeout: 60000,
      screenshot: 'only-on-failure',
      video: 'off',
      launchOptions: {
        args: ['--disable-gpu']
      },
      // automatically use logged-in state

     /*extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },*/

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  projects: [

  // ========== SETUP PROJECTS (RUN FIRST) ==========
    {
      name: 'setup-chromium',
      testMatch: /setup\.chromium\.ts/,
      testDir: './tests/setup',
      use: { ...devices['Desktop Chrome'], locale: 'en-US', 
        launchOptions: { args: ['--lang=en-US'], channel: 'chromium' },
        video: 'off',
      },
    },
    {
      name: 'setup-firefox',
      testMatch: /setup\.firefox\.ts/,
      testDir: './tests/setup',
      use: { ...devices['Desktop Firefox'], locale: 'en-US',
        launchOptions: { args: ['--lang=en-US'] },
        video: 'off',
      }
    },
    {
      name: 'setup-edge',
      testMatch: /setup\.edge\.ts/,
      testDir: './tests/setup',
      use: {
        ...devices['Desktop Edge'], locale: 'en-US', 
        launchOptions:{ args: ['--lang=en-US'], channel: 'msedge' },
        video: 'off',
      }
    },
    

    // ========== BROWSER TESTS (RUN AFTER SETUP) ==========
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/chromium-user.json', locale: 'en-US', launchOptions: { args: ['--lang=en-US'], channel: 'chromium' } },
      dependencies: ['setup-chromium'],
      testDir: './tests',
      testIgnore: /.*\.(setup|teardown)\..*\.ts/
    },
    /*{
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'], 
        storageState: 'playwright/.auth/firefox-user.json',
        locale: 'en-US',
        timezoneId: 'America/New_York',
      },
      dependencies: ['setup-firefox'],
      testDir: './tests',
      testIgnore: /.*\.(setup|teardown)\..*\.ts/
    },*/
    /*{
    name: 'Microsoft Edge',
    use: { 
      ...devices['Desktop Edge'], 
      channel: 'msedge', // This is correct
      storageState: 'playwright/.auth/edge-user.json', 
      locale: 'en-US',
      launchOptions: {
      args: ['--lang=en-US'],
      }
    },
    dependencies: ['setup-edge'],
    testDir: './tests',
  },*/
    /*

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

   //Run your local dev server before starting the tests 
   /*webServer: {
     command: 'npm run start',
     url: process.env.APP_URL,
     reuseExistingServer: !process.env.CI,
   },*/
});
