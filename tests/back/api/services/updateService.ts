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

    async patchCartQuantity(productName: string,quantity: number): Promise<void> {

      const startTime = Date.now();
      const updatedProduct = dbManager.updateProduct(productName, quantity);

      this.response = {
        status: () => updatedProduct ? 200 : 404,
        ok: !!updatedProduct,
        json: async () => ({product: updatedProduct}),
        text: async () => updatedProduct ? 'Updated': 'Product not found'
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

    const cartItems = dbManager.getCartItems();

    const item = cartItems.find((cartItem: any) => cartItem.productName === productName);

    expect(item).toBeDefined();
    expect(item.quantity).toBe(expectedQuantity);
}
 

}

