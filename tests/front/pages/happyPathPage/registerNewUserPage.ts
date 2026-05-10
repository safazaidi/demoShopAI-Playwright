import { expect, Page, Locator } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import  {testConfig}  from '../../config/testConfig';


export class RegisterUserPage extends BaseAction {
    readonly page: Page;
    readonly actions: BaseAction;
    readonly registerBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passWord: Locator;
    readonly confirPassword: Locator;
    readonly btnRegister: Locator

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.actions = new BaseAction(page); 
        this.registerBtn = page.getByRole('button', { name: 'Register' });
        this.firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.emailInput = page.getByLabel('Email');
        this.confirPassword =  page.getByLabel('Confirm password:')
        this.passWord = page.getByLabel('Password:');
        this.btnRegister = page.locator('[name="register-button"]')
    }





    async navigateToHomePage() {
        await this.page.goto(testConfig.baseUrl);
    }
    async clickRegisterButton() {
        await this.registerBtn.click();
    }
    async fillRegistrationFormWithValidData() {
        await this.firstNameInput.fill(testConfig.credentials.userFirsname),
        await this.lastNameInput.fill(testConfig.credentials.userLastName);
        await this.passWord.fill(testConfig.credentials.password)
        await this.confirPassword.fill(testConfig.credentials.password)
    }
    async submitRegistrationForm() {
        await this.btnRegister.click();
    }
    async verifyConfirmationMessage() {
        const confirmationMessage = await this.page.getByText('Registration successful').innerText();
        expect(confirmationMessage).toBe('Registration successful');
    }
    
}