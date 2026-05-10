import { expect, Page, Locator } from '@playwright/test';
import  BaseAction  from '../../utils/basePage';
import  {testConfig}  from '../../config/testConfig';

export class SearchInexistingProd extends BaseAction {

    readonly page: Page;
    readonly actions: BaseAction;
    readonly barreSearch: Locator;
    readonly btnSearch: Locator;
    readonly errorMssg: Locator;

    constructor(page: Page){
        super(page)
        this.page = page;
        this.actions = new BaseAction(page);
        this.barreSearch = page.locator('#small-searchterms');
        this.btnSearch = page.locator('input.button-1.search-box-button:visible');
        this.errorMssg = page.getByText('No products were found that matched your criteria.')
    }

    async searchInxistProd(inexistName: string){
        await this.barreSearch.fill('inexistName') ;
        await this.btnSearch.click();
    }

    async failMssgnonexistingproduct(expectedErrorMessage?: string){
        const defaultErrorMessage = 'No products were found that matched your criteria.';
    // Si aucun message n'est fourni, on utilise le message par défaut
       await expect(this.errorMssg, expectedErrorMessage || defaultErrorMessage).toBeVisible();
    }
}
       