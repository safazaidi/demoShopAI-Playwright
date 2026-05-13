import { expect, Page, Locator } from '@playwright/test';
import BaseAction from '../../utils/basePage';

export class RegisterExistingPage extends BaseAction {
    readonly page: Page;
    readonly actions: BaseAction
    readonly registerBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly submitBtn: Locator;


  constructor(page: Page) {
    super(page);
    this.page = page;
    this.actions = new BaseAction(page);
    this.confirmPassword = page.locator('input[name="ConfirmPassword"]');
    this.password = page.locator('input[name="Password"]');
    this.registerBtn = page.getByRole('link', { name: 'Register' });
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email');
    this.submitBtn = page.locator('[name="register-button"]');
  }

  async navigateToHomePage() {
    await this.page.goto('https://demowebshop.tricentis.com/', { waitUntil: 'domcontentloaded' });
  }
    async clickRegisterButton() {
    await this.registerBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.registerBtn.click();
}

async fillRegistrationFormWithExistingEmail(name: string, lastname: string, email: any, mdp:any) {
    await this.firstNameInput.fill(name);
    await this.lastNameInput.fill(lastname);
    await this.emailInput.fill(email);
    await this.password.fill(mdp);
    await this.confirmPassword.fill(mdp)
}

async submitRegistrationForm() {
    await this.submitBtn.click();
}}