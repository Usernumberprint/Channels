// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://online.if.test.vtb.ru',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    viewport : {height : 1263, width: 1165},
    ignoreHTTPSErrors: true,
    // colorScheme : 'dark',
    // colorScheme : 'light',
  },

  /* Configure projects for major browsers */
  projects: [
     {
      name: 'dark',
      use: { colorScheme: 'dark' },
    },
    // {
    //   name: 'light',
    //   use: { colorScheme: 'light' },
      
    // },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
     {
      name: 'Galaxy A55 dark',
      use: { ...devices['Galaxy A55'], colorScheme : 'dark'},
    },
         {
      name: 'Galaxy A55 light',
      use: { ...devices['Galaxy A55'], colorScheme : 'light'},
    },
    {
      name: 'Google ChromeDark',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport :  {height : 1263, width: 1165},headless: false, colorScheme : 'dark'},
    },
        {
      name: 'Google ChromeLight',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport :  {height : 1263, width: 1165},headless: false},
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

