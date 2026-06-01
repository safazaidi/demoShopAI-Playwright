// services/BaseService.ts

import { APIRequestContext, request } from '@playwright/test';

export class BaseService {
  protected apiContext!: APIRequestContext;

  async initContext() {
    this.apiContext = await request.newContext({
      baseURL: 'https://demowebshop.tricentis.com/',
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }
}