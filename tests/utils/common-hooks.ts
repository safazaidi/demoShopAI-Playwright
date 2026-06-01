import { CustomWorld } from '../utils/custom-world';
import { config } from './config';
import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;

const TIMEOUT = 200000;

setDefaultTimeout(process.env.PWDEBUG ? -1 : TIMEOUT);

/**
 * BeforeAll hook - Launches the browser before running any tests
 */
BeforeAll(async function () {
  const browsers: any = {
    chromium,
    firefox,
    webkit,
  };

  if (!browsers[config.browser]) {
    throw new Error(
      `Invalid browser: ${config.browser}. Supported browsers: chromium, firefox, webkit`,
    );
  }

  console.log(`🚀 Launching ${config.browser} browser...`);
  browser = await browsers[config.browser].launch(config.browserOptions);
  console.log('✅ Browser launched successfully');
});

/**
 * Skip tests tagged with @ignore
 */
Before({ tags: '@ignore' }, async function () {
  return 'skipped' as any;
});

/**
 * Enable debug mode for tests tagged with @debug
 */
Before({ tags: '@debug' }, async function (this: CustomWorld) {
  this.debug = true;
  console.log('🐛 Debug mode enabled for this scenario');
});

/**
 * Before hook - Initialize browser context and page for each test
 */
Before(async function (this: CustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');

  console.log(`\n📝 Starting test: ${pickle.name}`);

  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: {
      dir: `tests/reports/videos/${this.testName}`,
      size: { width: 1366, height: 768 },
    },
    viewport: { width: 1366, height: 768 },
  });

  this.context.setDefaultTimeout(TIMEOUT);
  this.context.setDefaultNavigationTimeout(TIMEOUT);

  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(TIMEOUT);
  this.page.setDefaultNavigationTimeout(TIMEOUT);
  this.feature = pickle;

  console.log('✅ Browser context and page initialized');
});

/**
 * After hook - Cleanup and capture test results
 */
After(async function (this: CustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    const browserInfo =
      `Browser: ${this.page?.context().browser()?.browserType().name()} | ` +
      `Version: ${this.page?.context().browser()?.version()}`;

    await this.attach(browserInfo);

    const statusDuration =
      `Status: ${result?.status} | Duration: ${result.duration?.seconds}s`;

    await this.attach(statusDuration);

    // Capture screenshot on failure
    if (result.status !== Status.PASSED) {
      console.log(' Test failed, capturing screenshot...');
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
    } else {
      console.log(' Test passed');
    }
  }

  try {
    // Add a small delay to ensure all resources are released
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (this.page) {
      await this.page.close();
      console.log('Page closed');
    }
    
    if (this.context) {
      await this.context.close();
      console.log('Context closed');
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
});

/**
 * AfterAll hook - Close browser after all tests
 */
AfterAll(async function () {
  try {
    console.log('\n Closing browser...');
    if (browser) {
      await browser.close();
      console.log('Browser closed successfully');
    }
  } catch (error) {
    console.error('Error closing browser:', error);
  }
});
