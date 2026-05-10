import { Page, expect, selectors } from '@playwright/test';



export default class BaseAction {

  public page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  public async clickElements(selector: string) {
    await this.waitFor(selector);
    await this.page.click(selector);
  }

  public async fillText(selector: string, value: string) {
    await this.waitFor(selector);
    await this.page.fill(selector, value);
  }

  public async getPageTitel() {
    const htmlContent = this.page.title();
    return htmlContent;
  }

  public async waitFor(selector: string) {
    await this.page.waitForSelector(selector);
  }



}
