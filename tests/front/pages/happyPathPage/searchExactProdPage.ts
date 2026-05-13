import { expect, Page, Locator } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import  {testConfig}  from '../../config/testConfig';


export class SearchExactPage extends BaseAction {

    readonly page: Page;
    readonly actions: BaseAction;
    readonly inputSearch: Locator;
    readonly btnSearch: Locator;
    readonly expectRsult: Locator


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.actions=new BaseAction(page);
        this.inputSearch = page.locator('#small-searchterms');
        this.btnSearch= page.locator('input.button-1.search-box-button:visible');
        this.expectRsult = page.locator('#Q')

        /*this.nameProd = */
    }

    async searchProd(prodName: string){
        await this.inputSearch.fill(prodName);
        await this.btnSearch.click();
    }


    async verifySearchKeywordDisplayed(exactName: string) {
        await expect(this.expectRsult).toHaveValue(exactName);
    
  }
}