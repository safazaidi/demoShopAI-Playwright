import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {SearchService} from '../services/searchProdService'

import { ApiClient } from '../../../utils/ApiClient';

let apiClient: ApiClient;
let searchService: SearchService;


       
       
Given('a product named {string} exists in the system', async function (productName: string) {

    searchService = new SearchService(this.apiContext);

    await searchService.verifyProductExistsInSystem(productName)
           
});
       
   
       
When('the client sends a GET request to the product search API with query {string}', async function (searchQuery: string) {
           await searchService.search(searchQuery);
});

Then('the API response status code should equal  {int}', async function (statusCode: number) {
           await searchService.expectResponseStatus(statusCode)
});

Then('the response should include at least one product with name {string}', async function (productName: string) {
           await searchService.validateProductExists(productName);
});
       
   
       
Then('the API response time should be less than {int} seconds', async function (seconds: number) {
           await searchService.expectTimeResponse(seconds * 1000);
});
       