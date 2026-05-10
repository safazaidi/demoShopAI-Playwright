import { Given, When, Then } from "@cucumber/cucumber";
import { LoginDataPage } from "../../pages/happyPathPage/loginValidDataPage";
import { expect } from "@playwright/test";
import { SearchExactPage } from "../../pages/happyPathPage/searchExactProdPage";
import  {testConfig}  from '../../config/testConfig';
import { SearchByPressing } from "../../pages/happyPathPage/searchByPressingPage";


let loginPage: LoginDataPage;
let searchPage: SearchExactPage;
let searchByPressing: SearchByPressing;

Given('the user is on the home page for search by pressing', async function () {
    loginPage = new LoginDataPage(this.page);
    await loginPage.page.goto(testConfig.baseUrl);
});

When('the user enters {string} in the search bar and presses Enter for search by pressing', async function (searchTerm) {
    searchByPressing = new SearchByPressing(this.page);
    await searchByPressing.funcSearchByPressing(searchTerm);
});

Then('search results should be displayed for search by pressing', async function () {
    searchPage = new SearchExactPage(this.page);
    await searchPage.verifySearchKeywordDisplayed('Book');
  

})


       
   
       
    