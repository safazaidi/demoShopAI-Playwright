import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { RegisterUserPage } from "../../pages/happyPathPage/registerNewUserPage";
import  {testConfig}  from '../../config/testConfig';

let registerPage: RegisterUserPage;


Given('I want to navigate to the homePage as a new user', async function () {
    registerPage = new RegisterUserPage(this.page);
    await registerPage.navigateToHomePage();
});


Then('I should see the homePage as a new user', async function () {
    await expect(this.page).toHaveURL(testConfig.baseUrl);
});


When('I click on the register button as a new user', async function () {
    await registerPage.clickRegisterButton();
});


Then('I should see the registration form as a new user', async function () {
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
});

When('I fill in the registration form with valid data', async function () {
    await registerPage.fillRegistrationFormWithValidData();
    await registerPage.submitRegistrationForm();
});

Then('I should see a confirmation message', async function () {
    await registerPage.verifyConfirmationMessage();
});
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 