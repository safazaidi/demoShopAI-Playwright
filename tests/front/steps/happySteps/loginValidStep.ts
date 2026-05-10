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
    await expect(loginPage.emilInput).toBeVisible();
    await expect(loginPage.mdpInput).toBeVisible();
});


When('User want to Submit the login form as a valid user', async function () {
    await loginPage.btnLogin.click();
});


Then('User is logged in as a valid user', async function () {
    await loginPage.expectLoginSucess();
});


Then('Account links are visible for valid user', async function () {
    expect(await loginPage.areAccountLinksVisible()).toBe(true);
});
 
 
 
 
 
 /*import { Given, When, Then } from "@cucumber/cucumber";
       
Then('Homepage loads successfully', async function () {
          
});
       
   
       
When('User want to click on {string} link', async function (string) {
           
});
       
   
       
Then('Login page is displayed', async function () {
           
});
       
   
       
 When('User want to Enter valid credentials', async function () {
           
});
       
   
       
Then('Fields accept input', async function () {
           
});
       
  
       
When('User want to Submit the login form', async function () {
           
});
       
  
       
Then('User is logged in', async function () {
           
});
       
   
       
Then('Account links are visible', async function () {
           
});*/
       