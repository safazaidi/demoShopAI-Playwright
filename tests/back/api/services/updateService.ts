import { APIRequestContext, expect } from '@playwright/test';

const dbManager = require('../../../utils/dbManager');

type MockAPIResponse = {
  status: () => number;
  ok: boolean;
  json: () => Promise<any>;
  text: () => Promise<string>;
};

export class UpdateProd{

    private response!: MockAPIResponse;
    private responseTime!: number;
    constructor(){

    }

    async verifyCartItemInDatabase(productName: string, expectedQuantity: number): Promise<void> {
           const cartItems = dbManager.getCartItems();

           const cartItem = cartItems.find((item: any) => item.productName === productName);

           expect(cartItem).toBeDefined();
           expect(cartItem.quantity).toBe(expectedQuantity);
}

    async patchCartQuantity(productName: string, quantity: number): Promise<void> {

      const startTime = Date.now();
      const updatedCartItem = dbManager.updateCartItemQuantity(productName, quantity);

      this.response = {
        status: () => updatedCartItem ? 200 : 404,
        ok: !!updatedCartItem,
        json: async () =>
          updatedCartItem
            ? {
                productName: updatedCartItem.productName,
                quantity: updatedCartItem.quantity,
                totalPrice: updatedCartItem.totalPrice,
              }
            : { error: 'Product not found in cart' },
        text: async () =>
          updatedCartItem ? 'Updated' : 'Product not found in cart',
     };
     this.responseTime = Date.now() - startTime;
}

 async getResponse() {
        return this.response;
    }

    async getResponseTime() {
        return this.responseTime;
    }

async expectSuccessUpdate(statusCode: number): Promise<void>{
    expect(this.response.status()).toBe(statusCode);

}


async verifyProductQuantity(productName: string, expectedQuantity: number): Promise<void> {

    const body = await this.response.json();

    expect(body.productName).toBe(productName);
    expect(body.quantity).toBe(expectedQuantity);
}

async verifyDatabaseQuantity(productName: string, expectedQuantity: number): Promise<void> {
    const cartItem = dbManager.getCartItemByProductName(productName);

    expect(cartItem).toBeDefined();
    expect(cartItem.quantity).toBe(expectedQuantity);
}

async verifyRecalculatedTotalPrice(productName: string,expectedQuantity: number): Promise<void> {

  const product = dbManager.getProductByName(productName);

  expect(product).toBeDefined();

  const expectedTotal = Number(product.price) * expectedQuantity;

  const responseBody = await this.response.json();

  expect(responseBody.totalPrice).toBeCloseTo(expectedTotal,2);
}
 

}

