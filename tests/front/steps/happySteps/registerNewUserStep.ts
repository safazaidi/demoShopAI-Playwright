import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { RegisterUserPage } from "../../pages/happyPathPage/registerNewUserPage";
import  {testConfig}  from '../../config/testConfig';
let registerPage: RegisterUserPage;


Given('I want to navigate to the homePage as a new user', async function () {
    console.log(' Step 1: Checking page object...');
    if (!this.page) {
        throw new Error('Page object is not initialized!');
    }
    console.log(' Page object exists');
    console.log(' Step 1: Creating RegisterUserPage instance');
    registerPage = new RegisterUserPage(this.page);
    console.log(' Step 1: Navigating to homepage...');
    await registerPage.navigateToHomePage();
    console.log(' Step 1: Homepage loaded');
});


Then('I should see the homePage as a new user', async function () {
    try {
        console.log(' Step 2: Verifying homepage loaded...');
        // Verify the register link is visible on the homepage
        await expect(registerPage.registerBtn).toBeVisible();
        console.log(' Step 2: Homepage verified - Register link is visible');
    } catch (error) {
        console.error(' Step 2 failed:', error);
        throw error;
    }
});


When('I click on the register button as a new user', async function () {
    try {
        console.log('Step 3: Clicking register button...');
        await registerPage.clickRegisterButton();
        console.log('Step 3: Register button clicked');
    } catch (error) {
        console.error('Step 3 failed:', error);
        throw error;
    }
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
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 