import { APIRequestContext, request, expect } from '@playwright/test';

export default class PasswordResetService {
  private apiContext!: APIRequestContext;
  private response: any;

  async init() {
    this.apiContext = await request.newContext({
      baseURL: 'https://d27b1iid8q1c6o.cloudfront.net',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  }

  async requestPasswordReset(email: string) {
    this.response = await this.apiContext.post(
      '/api/email/request-password-reset',
      {
        data: { email },
      }
    );
  }

  async getStatus() {
    return this.response.status();
  }

  async getResponseBody() {
    return await this.response.json();
  }
}
