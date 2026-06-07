
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { ApiClient } from '../../../utils/ApiClient';
import { AuthService } from '../services/authentification';

let apiClient: ApiClient;
let authService: AuthService;

let loginResult: any;

Given('a registered user exists in the system', async function () {
    apiClient = new ApiClient();
    await apiClient.init();

    authService = new AuthService(apiClient.getContext());

    const dbManager = require('../../../utils/dbManager');
    const seededUser = dbManager.getUserByEmail('testuser@example.com');
    if (!seededUser) {
        throw new Error('Seeded user testuser@example.com not found in the database');
    }

    this.credentials = {
        Email: seededUser.email,
        Password: seededUser.password,
    };
});

Given('the user provides valid email and password', async function () {
    expect(this.credentials).toBeDefined();
    expect(this.credentials.Email).toBe('testuser@example.com');
    expect(this.credentials.Password).toBe('password123');
});

When('the client sends a POST request to the login API', async function () {
    loginResult = await authService.login(this.credentials);
    this.responseTime = loginResult.responseTime;
});

Then('the API response status code should be {int}', async function (int) {
    expect(loginResult.response.status()).toBe(int);
});

Then('the authentication should be successful', async function () {
    const body = await loginResult.response.json();

    expect(loginResult.response.ok).toBeTruthy();
    expect(body.message).toContain('Login successful');
    expect(body.user).toBeTruthy();
    expect(body.user.email).toBe('testuser@example.com');
});

Then('the response should contain an authentication token or session ID', async function () {
    const body = await loginResult.response.json();
    expect(body.token || (body as any).sessionId).toBeTruthy();
});





