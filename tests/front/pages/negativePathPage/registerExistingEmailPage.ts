import { expect, Page, Locator } from '@playwright/test';
import BaseAction from '../../utils/basePage';

export class RegisterExistingPage extends BaseAction {
    readonly page: Page;
    readonly actions: BaseAction
    readonly registerBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;


  constructor(page: Page) {
    super(page);
    this.page = page;
    this.actions = new BaseAction(page);
    
    this.registerBtn = page.getByRole('button', { name: 'Register' });
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email');
  }

  async navigateToHomePage() {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }
    async clickRegisterButton() {
    await this.registerBtn.click();
}

async fillRegistrationFormWithExistingEmail(name: string, lastname: string, email: any) {
    await this.firstNameInput.fill(name);
    await this.lastNameInput.fill(lastname);
    await this.page.getByLabel('Email').fill(email);
}

async submitRegistrationForm() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
}}