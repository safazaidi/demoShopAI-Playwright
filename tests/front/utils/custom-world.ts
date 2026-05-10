
import {
    setWorldConstructor,
    World,
    IWorldOptions,
    IWorld,
  } from '@cucumber/cucumber';
  import * as messages from '@cucumber/messages';
  import {
    BrowserContext,
    Page,
    PlaywrightTestOptions,
    APIRequestContext,
  } from '@playwright/test';
  
  export interface CustomWorld extends IWorld {
    debug: boolean;
    urlRedirection?: string | null;
    urlCurrent?: string;
    urlDeal?: string | null;
    feature?: messages.Pickle;
    context?: BrowserContext;
    page?: Page;
    brand?: string;
    testName?: string;
    startTime?: Date;
    server?: APIRequestContext;
    playwrightOptions?: PlaywrightTestOptions;
  }
  
  export class DefaultCustomWorld extends World implements CustomWorld {
    constructor(options: IWorldOptions) {
      super(options);
    }
    debug = false;
  }
  
  setWorldConstructor(DefaultCustomWorld);
  