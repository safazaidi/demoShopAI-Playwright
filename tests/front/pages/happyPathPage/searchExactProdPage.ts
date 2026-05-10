import { expect, Page, Locator } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import  {testConfig}  from '../../config/testConfig';


export class SearchExactPage extends BaseAction {

    readonly page: Page;
    readonly actions: BaseAction;
    readonly inputSearch: Locator;
    readonly btnSearch: Locator;
   /* readonly nameProd: Locator;*/


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.actions=new BaseAction(page);
        this.inputSearch = page.locator('#small-searchterms');
        this.btnSearch= page.locator('input.button-1.search-box-button:visible');
        /*this.nameProd = */
    }

    async searchProd(prodName: string){
        await this.inputSearch.fill(prodName);
        await this.btnSearch.click();
    }


    async verifySearchKeywordDisplayed(keyword: string, selector: string = 'text=Search Keyword') {
    // Wait for the element containing "Search Keyword" to be visible
       const keywordLocator = this.page.locator(selector);
       await expect(keywordLocator).toBeVisible();

    // Check that the keyword is present in the element's text
       const textContent = await keywordLocator.textContent();
       expect(textContent?.toLowerCase()).toContain(keyword.toLowerCase());
  }
}