import{ Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {SearchService} from '../services/searchProdService'
import {UpdateProd} from '../services/updateService';
import { ApiClient } from '../../../utils/ApiClient';

let apiClient: ApiClient;



let updateService: UpdateProd;       
Given('a customer has {string} with quantity {int} in their cart', async function (string, int) {
    updateService = new UpdateProd();
    await updateService.verifyCartItemInDatabase(string, int);

});


When('the client sends a PATCH request to the cart quantity API to update {string} quantity to {int}', async function (string, int) {

    await updateService.patchCartQuantity(string, int);

});



Then('the API response statuscode should be {int}', async function (int) {

     await updateService.expectSuccessUpdate(int);
});



Then('the response should confirm the quantity is updated to {int}', async function (int) {
    await updateService.verifyProductQuantity('Apple iPhone 13', int);

});



Then('the database cart entry should reflect quantity {int}', async function (int) {
          await updateService.verifyDatabaseQuantity('Apple iPhone 13', int);
});
 
       
Then('the response should include a recalculated total price', async function () {
           await updateService.verifyRecalculatedTotalPrice('Apple iPhone 13',2)
});