import { Page, expect, selectors } from '@playwright/test';



export default class BaseAction {

  public page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  public async clickElements(selector: any) {
    await this.page.locator(selector).click();
  }

  public async fillText(selector: any, value: any) {
    
    await this.page.locator(selector).fill(value)
  }

  public async getPageTitel() {
    const htmlContent = this.page.title();
    return htmlContent;
  }

  public async waitFor(selector: string) {
    await this.page.waitForSelector(selector);
  }



}
