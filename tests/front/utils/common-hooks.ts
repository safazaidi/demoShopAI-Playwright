

/*import { CustomWorld } from '../utils/custom-world';
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
  ConsoleMessage,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';

declare global {
  let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}


const TIMEOUT = 200000;

setDefaultTimeout(process.env.PWDEBUG ? -1 : TIMEOUT);

// Launch the browser before all tests
BeforeAll(async function () {
  const browsers: any = {
    chromium,
    firefox,
    webkit,
  };
  browser = await browsers[config.browser].launch(config.browserOptions);
});

Before({ tags: '@ignore' }, async function () {
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: CustomWorld) {
  this.debug = true;
});

Before(async function (this: CustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: {
      dir: 'tests/reports/videos/' + this.testName,
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
});

After(async function (this: CustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(
      'Browser:' +
      this.page?.context().browser()?.browserType().name() +
      ' Version: ' +
      this.page?.context().browser()?.version(),
    );
    await this.attach(
      `Status: ${result?.status}. Duration:${result.duration?.seconds}s`,
    );

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
    }
  }
  await this.page?.close();
  await this.context?.close();
});

// Close the browser after all tests
AfterAll(async function () {
  await browser.close();
});*/
