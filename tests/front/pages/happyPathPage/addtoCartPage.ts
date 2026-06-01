import { expect, Page, Locator } from '@playwright/test';
import  BaseAction  from '../../../utils/basePage';
import  {testConfig}  from '../../../config/testConfig';

export class AddToCartPage extends BaseAction {
    readonly page: Page;
    readonly product: Locator;
    readonly btnAddtoCart: Locator;
    readonly action: BaseAction;
    readonly notifMessage: Locator;
    readonly linkShopping: Locator;
    readonly quantityProd: Locator;
    readonly quantityInCart: Locator;
    readonly checkBtn: Locator;
    readonly agreeCondition: Locator;
    readonly cityName: Locator;
    readonly addressOne: Locator;
    readonly postalCode: Locator;
    readonly phoneNumber: Locator;
    readonly continueBtn: Locator;
    readonly countryName: Locator;
    readonly nameUser:Locator;
    readonly lastNameUser:Locator;
    readonly emailUser: Locator;
    readonly prodPresent: Locator;
    readonly shippBtn: Locator;
    readonly btnPayment: Locator;
    readonly btnConfirm: Locator;
    readonly successPaymentMessage: Locator;
    readonly orderConfirm: Locator;
    readonly orderInformation: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.action = new BaseAction(page);
        this.btnAddtoCart = page.locator('#add-to-cart-button-31') ;
        this.product = page.getByRole('img', { name: 'Picture of 14.1-inch Laptop' });
        this.notifMessage =  page.getByText('The product has been added to your shopping cart');
        this.quantityProd = page.getByRole('textbox', { name: /Qty:/i });
        this.quantityInCart = page.locator('input[class*="qty"]');
        this.linkShopping =  page.getByRole('link', { name: 'shopping cart', exact: true });
        this.checkBtn =  page.getByRole('button', { name: 'Checkout' });
        this.agreeCondition = page.locator('#termsofservice');
        this.cityName =  page.getByRole('textbox', { name: 'City:' });
        this.addressOne = page.getByLabel('Address 1:');
        this.postalCode = page.getByLabel('Zip / postal code:');
        this.phoneNumber = page.getByLabel('Phone number:');
        this.continueBtn =  page.locator("//input[@onclick='Billing.save()']");
        this.countryName =  page.getByLabel('Country:');
        this.emailUser = page.getByLabel('Email:');
        this.nameUser =  page.getByLabel('First name:');
        this.lastNameUser =  page.getByLabel('Last name:');
        this.prodPresent =  page.locator('a.product-name:visible');
        this.shippBtn =  page.getByRole('radio', { name: 'Ground (0.00)' });
        this.btnPayment= page.locator("//input[@id='paymentmethod_0']");
        this.btnConfirm =  page.locator('input.button-1.confirm-order-next-step-button');
        this.successPaymentMessage =  page.getByText('Your order has been successfully processed!');
        this.orderConfirm =  page.getByRole('link', { name: 'Click here for order details.' });
        this.orderInformation =  page.getByText('Order information');
        

    }

    async selectProd(){
        await this.product.click();
    }

    async clickAddToCart(){
        await this.btnAddtoCart.click();
        
    }

    async sucessNotif(){
        await expect(this.notifMessage).toBeVisible();
    }

    async getCartQuantity(): Promise<number> {
      const quantityText = await this.quantityProd.textContent();

      return Number(quantityText?.replace(/\D/g, '').trim());
  }

 

async verifyQuantityUpdated(increment: number = 1) {
    
    const currentValueStr = await this.quantityInCart.inputValue();
    const currentValue = Number(currentValueStr);
    
    expect(currentValue).toBeGreaterThanOrEqual(increment);
    
    await expect(this.quantityInCart).toHaveValue(String(currentValue));
}

  async navigatetoshoppingCart(){
    await this.linkShopping.click();
  }

  async productPresentSuccess(){
    await expect(this.prodPresent).toBeVisible();

  }

  async agreeService(){
    await this.agreeCondition.waitFor({ state: 'visible' });
    await this.agreeCondition.click();
  }

  async checkOut(){
    await this.checkBtn.click();
  }

  async fillInformation(name: string, lasname: string, mobilePhone: string,cityInput: string, addressName: string, postalCode:any,countryInput:string){
        await this.nameUser.fill(name);
        await this.lastNameUser.fill(lasname);
        await this.phoneNumber.fill(String(mobilePhone));
        await this.cityName.fill(cityInput);
        await this.addressOne.fill(addressName);
        await this.postalCode.fill(postalCode);
        await this.countryName.selectOption(countryInput);
        
        
    }
  async clickContinue(){
     await this.action.clickElements(this.continueBtn);
  }

  async shippMthod(){
    await this.action.clickElements(this.shippBtn);

  }

  async paymentMethod(){
     await this.action.clickElements(this.btnPayment);
  }

  async confirmPayment(){
    await this.action.clickElements(this.btnConfirm);

  }

  async expetPaymentSuccess(){
    await expect(this.successPaymentMessage).toBeVisible();

  }

  async orderCheckSuccess(){
    await this.action.clickElements(this.orderConfirm);
    await expect(this.orderInformation).toBeVisible();

  }
}