import { Locator, Page } from "@playwright/test";
import BaseAction from "../../utils/basePage"

export class SearchByPressing extends BaseAction{
    readonly page: Page;
    readonly actions: BaseAction;
    readonly inputSearch: Locator;
    readonly msggresult: Locator;
    
    


    constructor(page: Page){
        super(page)
        this.page = page;
        this.actions = new BaseAction(page);
        this.inputSearch = page.getByRole('textbox');
        this.msggresult =  page.getByRole('textbox', { name: 'Search keyword:' })

    }

    async funcSearchByPressing(value: string){

        await this.inputSearch.fill(value);
        await this.inputSearch.press('Enter');
    }

    

}