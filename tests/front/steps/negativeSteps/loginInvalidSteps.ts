import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginInvalidCredentials } from "../../pages/negativePathPage/loginInvalidDataPage";

let loginPage: LoginInvalidCredentials;

Given('I am on the homepage', async function () {
    loginPage = new LoginInvalidCredentials(this.page);
    await this.page.goto('https://demowebshop.tricentis.com/');
});

When('I click on the {string} link', async function (linkName) {
    await loginPage.linkBtn.click();
});

Then('the login page should be displayed', async function () {
    await expect(this.page).toHaveURL(/login/);
});

When('I enter invalid credentials', async function () {
    await loginPage.loginInvalidData('test789@gmail.com', 'test4785');
});

Then('the fields should accept input', async function () {
    await expect(loginPage.invalidEmail).toBeVisible();
    await expect(loginPage.invalidMdp).toBeVisible();
});

When('I submit the login form', async function () {
    await loginPage.submitBtn.click();
});

Then('an error message about invalid login should be displayed', async function () {
    await loginPage.expectLoginFail();
});






/*import { Given, When, Then } from "@cucumber/cucumber";
       
 Given('I am on the homepage', async function () {
          
 });
       
   
 When('I click on the {string} link', async function (string) {
           
});
       
  
       
Then('the login page should be displayed', async function () {
           
});
       
   
       
When('I enter invalid credentials', async function () {
           
});
       
   
       
Then('the fields should accept input', async function () {
           
});
       
   
When('I submit the login form', async function () {
           
});
       
   
       
Then('an error message about invalid login should be displayed', async function () {
           
});*/