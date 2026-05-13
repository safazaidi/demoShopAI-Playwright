import { expect, Page, Locator } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import  {testConfig}  from '../../config/testConfig';
import { EmailGenerator } from '../../utils/dataGenerator';



export class RegisterUserPage extends BaseAction {
    readonly page: Page;
    readonly actions: BaseAction;
    readonly registerBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passWord: Locator;
    readonly confirPassword: Locator;
    readonly btnRegister: Locator;
    readonly confirmMessage: Locator;
    readonly btnContinue: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.actions = new BaseAction(page); 
        this.btnContinue = page.locator("input[value='Continue']")
        this.confirmMessage = page.getByText('Your registration completed')
        this.registerBtn = page.getByRole('link', { name: 'Register' });
        this.firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.emailInput = page.getByLabel('Email');
        this.passWord = page.locator('input[name="Password"]');
        this.confirPassword = page.locator('input[name="ConfirmPassword"]');
        this.btnRegister = page.locator('[name="register-button"]')
    }





    async navigateToHomePage() {
        try {
            console.log(` Navigating to: ${testConfig.baseUrl}`);
            await this.page.goto(testConfig.baseUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
            console.log(' Navigation complete');
        } catch (error) {
            console.error(' Navigation failed:', error);
            throw error;
        }
    }
    async clickRegisterButton() {
        
        try {
            console.log(' Waiting for Register link/button to be visible...');
            // Try to find Register as button first, then as link
            
            await this.registerBtn.waitFor({ state: 'visible', timeout: 15000 });
            console.log(' Register link is visible, clicking...');
            await this.registerBtn.click();
            console.log(' Register link clicked successfully');
        } catch (error) {
            console.error(' Error clicking Register element:', error);
            throw error;
        }
    }
    async fillRegistrationFormWithValidData() {
        try {
            console.log(' Filling registration form...');
            await this.firstNameInput.fill(testConfig.credentials.userFirsname);
            console.log(' First name filled');
            await this.lastNameInput.fill(testConfig.credentials.userLastName);
            console.log(' Last name filled');
            const email = EmailGenerator.generateEmail();
            await this.emailInput.fill( email);
            //await this.emailInput.fill(testConfig.credentials.userEmail);
            await this.passWord.fill(testConfig.credentials.password);
            console.log(' Password filled');
            await this.confirPassword.fill(testConfig.credentials.password);
            console.log(' Confirm password filled');
        } catch (error) {
            console.error(' Error filling form:', error);
            throw error;
        }
    }
    async submitRegistrationForm() {
        try {
            console.log(' Waiting for Submit button to be visible...');
            await this.btnRegister.waitFor({ state: 'visible', timeout: 15000 });
            console.log(' Submit button is visible, clicking...');
            
            // Start waiting for navigation/response before clicking
            const navigationPromise = this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {
                console.log(' No navigation detected after submission');
            });
            
            await this.btnRegister.click();
            console.log(' Submit button clicked');
            
            // Wait for the navigation/response to complete
            await navigationPromise;
            console.log(' Form submission completed');
        } catch (error) {
            console.error(' Error submitting form:', error);
            throw error;
        }
    }
    async verifyConfirmationMessage() {
          await expect(this.confirmMessage).toBeVisible()
          await this.btnContinue.click();
    }
    
}