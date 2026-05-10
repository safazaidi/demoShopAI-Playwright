import { expect, Page, Locator } from '@playwright/test';
import  BaseAction  from '../../utils/basePage';
import  {testConfig}  from '../../config/testConfig';


export class LoginDataPage extends BaseAction{
    readonly page: Page;
    readonly loginLink: Locator;
    readonly emilInput: Locator;
    readonly mdpInput: Locator;
    readonly btnLogin: Locator;
    readonly action: BaseAction;
    readonly logOutBtn: Locator;

    
    constructor(page: Page){
        super(page);
        this.page = page;
        this.action = new BaseAction(page);
        this.logOutBtn = page.getByRole('link', { name: 'Log out' })
        this.btnLogin=  page.locator("//input[@value='Log in']")
        this.emilInput= page.getByLabel('Email:')
        this.loginLink=  page.getByRole('link', { name: 'Log in' })
        this.mdpInput=  page.getByLabel('Password:')



    }

    async loginValidData(){
        await this.page.goto(testConfig.baseUrl)
        await this.loginLink.click();
        await this.emilInput.fill(testConfig.credentials.userEmail);
        await this.mdpInput.fill(testConfig.credentials.password);
        await this.btnLogin.click();
    }

    async verifyPageLoaded(urlPart: string, locators: (string | Locator)[]) {
       await this.page.waitForURL(`**/${urlPart}**`);
       for (const locator of locators) {
          if (typeof locator === 'string') {
             await expect(this.page.locator(locator)).toBeVisible();
          } else {
            await expect(locator).toBeVisible();
          }
    }
}

    async expectLoginSucess(){
        await expect(this.page).toHaveURL('testConfig.baseUrl')
    }
// In loginPage.ts
   async areAccountLinksVisible(): Promise<boolean> {
  // Adjust selectors as needed for your app
     return await this.logOutBtn.isVisible();
   }

}