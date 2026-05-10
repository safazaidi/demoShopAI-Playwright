import { Given, When, Then } from "@cucumber/cucumber";
import { LoginDataPage } from "../../pages/happyPathPage/loginValidDataPage";
import { expect } from "@playwright/test";
import { SearchExactPage } from "../../pages/happyPathPage/searchExactProdPage";
import  {testConfig}  from '../../config/testConfig';


let loginPage: LoginDataPage;
let searchPage: SearchExactPage;

Given('the user is on the home page for search by exact name', async function () {
    loginPage = new LoginDataPage(this.page);
    await loginPage.page.goto(testConfig.baseUrl);
});

When('the user enters {string} in the search bar clicks on the search button for exact name', async function (searchTerm) {
    searchPage = new SearchExactPage(this.page);
    await searchPage.searchProd(searchTerm);
});

Then('search results should be displayed for search by exact name', async function () {
    searchPage = new SearchExactPage(this.page);
    await searchPage.verifySearchKeywordDisplayed('laptop');
});
       
   
