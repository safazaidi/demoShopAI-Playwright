import { APIRequestContext, expect } from '@playwright/test';
//import { ApiClient } from '../../../utils/ApiClient';

const dbManager = require('../../../utils/dbManager');

type MockAPIResponse = {
  status: () => number;
  ok: boolean;
  json: () => Promise<{ products: any[] }>;
  text: () => Promise<string>;
};

//let apiClient: ApiClient;
export class SearchService{

    private response!: MockAPIResponse;
    private responseTime!: number;
    constructor(private api: APIRequestContext){
        
    }

    

    async verifyProductExistsInSystem(productName: string): Promise<void> {

    const products = dbManager.searchProducts(productName);

    const productExists = products.some(
        (product: any) => product.name === productName
    );

    expect(productExists).toBeTruthy();
}

    async search(searchQuery: string): Promise<void> {

        const startTime = Date.now();

        const query = searchQuery.replace(/^q=/, '');
        const decodedQuery = decodeURIComponent(query).replace(/\+/g, ' ');

        const products = dbManager.searchProducts(decodedQuery);

        this.response = {
            status: () => (products.length > 0 ? 200 : 404),
            ok: products.length > 0,
            json: async () => ({ products }),
            text: async () => (products.length > 0 ? 'OK' : 'Not Found'),
        };

        this.responseTime = Date.now() - startTime;
    }

    async expectResponseStatus(statusCode: number): Promise<void>{
        expect(this.response.status()).toBe(statusCode);
    }

    async validateProductExists(productName: string): Promise<void> {
        const body = await this.response.json();
        const productFound = body.products.some((product: any) => product.name === productName);
        expect(productFound).toBeTruthy();
    }


    async expectTimeResponse(maxTime: number): Promise<void>{
         expect(this.responseTime).toBeLessThan(maxTime);
    }

}

