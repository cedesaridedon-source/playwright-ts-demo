import { Locator, Page, expect} from '@playwright/test';

export class productPage {
    constructor (private page : Page) {
    }

    async openProductPage () {
    await this.page.goto('/')
}
  ///visible filters all hidden element, only elements actually visible on screen are match
    private get validateHomePage () { return this.page.locator('div.carousel-inner h1:visible')}
    private get clickProductLink () { return this.page.locator('a[href="/products"]')}
    private get validateProductPage () { return this.page.locator ('div.features_items h2').first()}
    private get validateCategory() { return this.page.locator('div.left-sidebar h2').first()}
    private get validateBrands() { return this.page.locator('div.brands_products h2').first()}
    
    async productPage (){

        await expect (this.validateHomePage).toHaveText(/Automation\s*Exercise/);
        await this.clickProductLink.click()
        await expect (this.page).toHaveURL('/products');
        await expect (this.validateProductPage).toHaveText('All Products');
        await expect (this.validateCategory).toHaveText('Category');
        await expect (this.validateBrands).toHaveText('Brands');

    }
    
}

