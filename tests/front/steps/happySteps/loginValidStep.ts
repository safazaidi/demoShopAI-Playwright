 import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginDataPage } from "../../pages/happyPathPage/loginValidDataPage";
import  {testConfig}  from '../../config/testConfig';


let loginPage: LoginDataPage;


Given('I want to navigate to the homePage as a valid user', async function () {
    loginPage = new LoginDataPage(this.page);
    await this.page.goto(testConfig.baseUrl);
});

Then('Homepage loads successfully for valid user', async function () {
    await expect(this.page).toHaveURL(testConfig.baseUrl);
});


When("User want to click on 'Log in' link as a valid user", async function () {
    await loginPage.loginLink.click();
});


Then('Login page is displayed for valid user', async function () {
    await expect(loginPage.btnLogin).toBeVisible();
});


When('User want to Enter valid credentials as a valid user', async function () {
    await loginPage.loginValidData();
});


Then('Fields accept input for valid user', async function () {
    await loginPage.expectFieldInput()
    
});


When('User want to Submit the login form as a valid user', async function () {
    await loginPage.clickElementSubmit();
});


Then('User is logged in as a valid user', async function () {
    await loginPage.expectUserIsLoggedIn();
});


Then('Account links are visible for valid user', async function () {
    await loginPage.expectAccountLinksAreVisible();
});
 
 
 
 
 
 