import { expect, Page, Locator } from '@playwright/test';
import  BaseAction  from '../../utils/basePage';
import  {testConfig}  from '../../config/testConfig';

export class LoginInvalidCredentials extends BaseAction {
    readonly page: Page;
    readonly linkBtn: Locator ;
    readonly invalidEmail: Locator;
    readonly invalidMdp: Locator;
    readonly submitBtn: Locator;
    readonly mssgError: Locator;
    readonly actions: BaseAction
    

    constructor(page: Page){
        super(page);
        this.page = page;
        this.actions = new BaseAction(page);
        this.invalidEmail = page.getByLabel('Email:');
        this.invalidMdp =page.getByLabel('Password:');
        this.linkBtn = page.getByRole('link', { name: 'Log in' });
        this.submitBtn = page.locator("//input[@value='Log in']");
        this.mssgError = page.getByText('Login was unsuccessful. Please correct the errors and try again.', { exact: true }) ;

    }
    async loginInvalidData(invalidEmail:string, invalidMdp: string){

        this.page.goto(testConfig.baseUrl);
        this.linkBtn.click();
        this.invalidEmail.fill('test789@gmail.com');
        this.invalidMdp.fill('test4785');
        this.submitBtn.click()


    }

   async homePageLoad(elements: Locator[]) {
       await expect(this.page).toHaveURL('testConfig.baseUrl');
}

     
async expectLoginFail(expectedMessage?: string) {
    const defaultMessage = 'Login was unsuccessful. Please correct the errors and try again.';
    // Si aucun message n'est fourni, on utilise le message par défaut
    await expect(this.mssgError, expectedMessage || defaultMessage).toBeVisible();
}

}