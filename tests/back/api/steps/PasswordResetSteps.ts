import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import PasswordResetService from "../services/PasswordResetService";

let email: string;
let passwordResetService: PasswordResetService;

Given('I have a valid email {string}', async function (mail: string) {
  email = mail;
  passwordResetService = new PasswordResetService();
  await passwordResetService.init();
});

When('I send a password reset request', async function () {
  await passwordResetService.requestPasswordReset(email);
});

Then('the API response status should be {int}', async function (statusCode: number) {
  expect(await passwordResetService.getStatus()).toBe(statusCode);
});

Then('the password reset request should be successful', async function () {
  const responseBody = await passwordResetService.getResponseBody();
  expect(responseBody).toBeDefined();
});
