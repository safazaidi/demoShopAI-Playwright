import { Given, When, Then } from "@cucumber/cucumber";
import { LoginDataPage } from "../../pages/happyPathPage/loginValidDataPage";
import  {testConfig}  from '../../../config/testConfig';
import { SearchExactPage } from "../../pages/happyPathPage/searchExactProdPage";
import {AddToCartPage} from "../../pages/happyPathPage/addtoCartPage";


import { expect } from "@playwright/test";

let loginPage: LoginDataPage;
let searchPage: SearchExactPage;
let addCartPage: AddToCartPage;
       
Given('the user navigates to the Demo Web Shop homepage', async function () {
    loginPage = new LoginDataPage(this.page);
    await loginPage.loginValidData();
    await loginPage.clickElementSubmit()
    
          
});
          
       
When('the user searches for {string}', async function (string) {
    searchPage = new SearchExactPage(this.page);
    await searchPage.searchProd('14.1-inch Laptop')
          
});
       
   
       
When('the user selects the product from search results', async function () {
     addCartPage = new AddToCartPage(this.page);
     await addCartPage.selectProd();

           
});
       
   
       
When('the user clicks on {string}', async function (string) {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.clickAddToCart();
           
});
       
   
       
Then('the success notification should be displayed', async function () {

    addCartPage = new AddToCartPage(this.page);
    await addCartPage.sucessNotif();
});
       
   
       
Then('the shopping cart quantity should be updated', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.verifyQuantityUpdated();
          
});
       
   
       
When('the user navigates to the shopping cart', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.navigatetoshoppingCart();
          
});
       
   
       
Then('the selected product should appear in the cart', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.productPresentSuccess();
          
});
       
   
       
When('the user agrees to the terms of service', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.agreeService();
           
});
       
   
       
When('the user proceeds to checkout', async function () {

    addCartPage = new AddToCartPage(this.page);
    await addCartPage.checkOut();
});
       
   
       
When('the user completes the billing information', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.fillInformation('test', 'Qa', '799851', 'Tunis', 'Tunis-canada', '75', 'canada');
    await addCartPage.clickContinue();
           
});
       
   
       
When('the user selects shipping method', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.shippMthod();
    await addCartPage.clickContinue();
});
       
   
       
When('the user selects payment method', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.paymentMethod();  
    await addCartPage.clickContinue(); 
});
       
   
       
When('the user confirms the order', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.confirmPayment();   
    await addCartPage.expetPaymentSuccess()  
    
});
       
   
       
Then('the order confirmation message should be displayed', async function () {
    addCartPage = new AddToCartPage(this.page);
    await addCartPage.orderCheckSuccess(); 
          
});