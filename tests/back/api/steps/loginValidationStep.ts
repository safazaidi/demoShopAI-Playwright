//import { Given, When, Then } from '@cucumber/cucumber';
//import { expect } from '@playwright/test';
//import { ApiClient } from '../../src/core/apiClient';
//import { PostsService } from '../../src/services/posts.service';

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
});

Given('the user provides valid email and password', async function () {

        this.credentials = {Email: "test@test.com",Password: "Password123"};
    });

When('the client sends a POST request to the login API', async function () {

        loginResult = await authService.login(this.credentials);
    });

Then('the API response status code should be {int}', async function (int) {

        expect(loginResult.response.status()).toBe(200);
    });

Then('the response should contain an authentication token or session ID', async function () {

        expect(loginResult.responseTime).toBeLessThan(2000);
    });

Then('the response should not expose sensitive data such as password or confidential information', async function () {
          
         });




