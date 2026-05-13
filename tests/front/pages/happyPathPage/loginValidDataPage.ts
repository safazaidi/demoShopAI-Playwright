import { expect, Page, Locator } from '@playwright/test';
import  BaseAction  from '../../utils/basePage';
import  {testConfig}  from '../../config/testConfig';


export class LoginDataPage extends BaseAction{
    readonly page: Page;
    readonly loginLink: Locator;
    readonly emailElement: Locator;
    readonly mdpInput: Locator;
    readonly btnLogin: Locator;
    readonly action: BaseAction;
    readonly logOutBtn: Locator;
    readonly sucessLoginText : Locator;
    readonly myAccountLink: Locator;
    readonly emailDisplayed: Locator;
    readonly submitBtn: Locator;

    
    constructor(page: Page){
        super(page);
        this.page = page;
        this.action = new BaseAction(page);
        this.logOutBtn = page.getByRole('link', { name: 'Log out' })
        this.btnLogin=  page.locator("//input[@value='Log in']")
        this.emailElement= page.getByLabel('Email:', { exact: true })
        this.loginLink=  page.getByRole('link', { name: 'Log in' })
        this.mdpInput=  page.getByLabel('Password:')
        this.sucessLoginText =   page.getByRole('link', { name: /testersoftware1723@gmail\.com/i })
        this.myAccountLink = page.getByRole('link', { name: /My Account|My account/i })
        this.emailDisplayed = page.locator(`text=${testConfig.credentials.userEmail}`)
        this.submitBtn =  page.getByRole('button')



    }

    async loginValidData(){
        await this.page.goto(testConfig.baseUrl)
        await this.loginLink.click();
        await this.emailElement.fill(testConfig.credentials.userEmail);
        await this.mdpInput.fill(testConfig.credentials.password);
        
    }

    async expectFieldInput(){
        await expect(this.emailElement).toBeVisible();
        await expect(this.mdpInput).toBeVisible();
    }
    
    async clickElementSubmit(){
        await this.btnLogin.click();
    }
    

    
    async expectUserIsLoggedIn(): Promise<void> {
        
        await expect(this.emailDisplayed).toBeVisible({ timeout: 5000 });
        
        
        await expect(this.page).not.toHaveURL(/login/i);
        
        
        await expect(this.logOutBtn).toBeVisible({ timeout: 5000 });
    }

    
    async expectAccountLinksAreVisible(): Promise<void> {
        
        await expect(this.logOutBtn).toBeVisible({ timeout: 5000 });
        
        
        await expect(this.myAccountLink).toBeVisible({ timeout: 5000 });
        
        
        await expect(this.emailDisplayed).toBeVisible({ timeout: 5000 });
    }

   async areAccountLinksVisible(): Promise<boolean> {
  
     return await this.logOutBtn.isVisible();
   }

}