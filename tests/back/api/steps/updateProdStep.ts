import{ Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the test database is initialized using dbManager.js', async function () {

});



Given('the database contains a user with email {string}', async function (string) {

});



Given('the database contains a product {string} priced at {float}', async function (string, float) {

});



Given('the user\'s cart contains {int} unit of {string} with unit price {float}', async function (int, string, float) {

});



When('the client sends a PATCH request to the cart quantity API to update {string} quantity to {int}', async function (string, int) {

});



Then('the API response statuscode should be {int}', async function (int) {

});



Then('the response should confirm the quantity is updated to {int}', async function (int) {

});



Then('the database cart entry should reflect quantity {int}', async function (int) {

});