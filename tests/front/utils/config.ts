import { LaunchOptions } from '@playwright/test';
const SLOW_MO = parseInt(process.env.ACCEPTANCE_TESTS_SLOW_MO || '0');
const HEADLESS = Boolean(process.env.HEADLESS || false);
const browserOptions: LaunchOptions = {
  slowMo: SLOW_MO,
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
  headless: HEADLESS,
};

export const config = {
  browser: process.env.BROWSER || 'chrome',
  browserOptions,
};

export const EXPECT_TIMEOUT = 30000;
