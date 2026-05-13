import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { RegisterExistingPage } from "../../pages/negativePathPage/registerExistingEmailPage";
import  {testConfig}  from '../../config/testConfig';

// You may need to adjust the path to match your project structure

let registerPage: RegisterExistingPage;


Given('I want to navigate to the homePage as an existing user', async function () {
    registerPage = new RegisterExistingPage(this.page);
    await registerPage.navigateToHomePage();
});


Then('I should see the homePage as an existing user', async function () {
    await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/');
});


When('I click on the register button as an existing user', async function () {
    await registerPage.clickRegisterButton();
});


Then('I should see the registration form as an existing user', async function () {
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
});

When('I fill in the registration form with an existing email', async function () {
    // Replace with actual test data for existing user
    await registerPage.fillRegistrationFormWithExistingEmail('John', 'Doe', testConfig.credentials.userEmail, 'deft754');
    await registerPage.submitRegistrationForm();
});

Then('I should see an error message indicating that the email is already in use', async function () {
    await expect(this.page.getByText('The specified email already exists')).toBeVisible();
});






/*import { CustomWorld } from "../utils/Custom-world";*/

/*import { expect } from "@playwright/test";
Given('I want to navigate to the homePage', async function () {
          
});

  
       

Then('I should see the homePage', async function () {
           
});

   

When('I click on the register button', async function () {
          
});

  

Then('I should see the registration form', async function () {
           
});

   

When('I fill in the registration form with an existing email', async function () {
           
});

   

Then('I should see an error message indicating that the email is already in use', async function () {
          
});*/
