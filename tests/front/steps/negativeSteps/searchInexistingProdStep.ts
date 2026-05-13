import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import  {testConfig}  from '../../config/testConfig';
import {SearchInexistingProd} from "../../pages/negativePathPage/searchInexistingProdPage";
import { LoginDataPage } from "../../pages/happyPathPage/loginValidDataPage";
let loginPage: LoginDataPage;

Given('the user is on the home page', async function () {
    loginPage = new LoginDataPage(this.page);
    await loginPage.page.goto(testConfig.baseUrl);
});
       
When('the user enters {string} in the search bar and clicks on the search button', async function (string) {
    
    this.searchInexist = new SearchInexistingProd(this.page);
    await this.searchInexist.searchInxistProd('Samsung S99 Ultra');
    
           
});   
   
       
Then('a message {string} should be displayed', async function (string) {
           
     this.searchInexist = new SearchInexistingProd(this.page);

    await this.searchInexist.failMssgnonexistingproduct('No products were found that matched your criteria.');
});