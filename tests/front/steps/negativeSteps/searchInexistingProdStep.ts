import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import  {testConfig}  from '../../config/testConfig';
import {SearchInexistingProd} from "../../pages/negativePathPage/searchInexistingProdPage";
   
       
When('the user enters {string} in the search bar and clicks on the search button', async function (string) {
    this.searchInexist = new SearchInexistingProd(this.page);
    await this.searchInxistProd('Samsung S99 Ultra').searchInexist()
           
});   
   
       
Then('a message {string} should be displayed', async function (string) {
           
    this.searchInexist = new SearchInexistingProd(this.page);
    await this.failMssgnonexistingproduct('No products were found that matched your criteria.').searchInexist()
});