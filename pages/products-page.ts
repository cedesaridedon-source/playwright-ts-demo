import { Locator, Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}  

  async openProductPage() {
    await this.page.goto('/products');
  }
  // Locators
  private get productsLink() { return this.page.getByRole('link', { name: 'Products' });}
  private get allProductsTitle() { return this.page.getByRole('heading', { name: /All Products/i }); }
  private get categoryTitle() {return this.page.getByRole('heading', { name: /Category/i });}
  private get brandsTitle() {return this.page.getByRole('heading', { name: /Brands/i });}

  // Actions / Assertions
  async verifyProductPage() { 
    await this.productsLink.click();
    await expect(this.page).toHaveURL(/products/); 
    await expect(this.allProductsTitle).toBeVisible();
    await expect(this.categoryTitle).toBeVisible();
    await expect(this.brandsTitle).toBeVisible();
  }

  ////Test Case 9: Search Product////
  private get searchInput() { 
    return this.page.locator('#search_product');
  }

  private get submitSearch() {
    return this.page.locator('#submit_search');
  }
  async verifySearchProductWithExactCount() {
    await this.productsLink.click();
    await this.searchInput.fill('Top');
    await this.submitSearch.click();

  const names = this.page.locator('.product-name');
  await expect(names.first()).toBeVisible();
  const texts = await names.allTextContents();
  for (const text of texts) {
  expect(text.toLowerCase()).toContain('top');
    }
    
  }
}
/////////// NOTES ///////////////
// constructor(...) runs when you create a new instance of the class
// page: Page → expects a Playwright Page object
// private page → declares + assigns a class property in one line
// Makes page accessible only inside the class
// Proper way to call the class///
       //const productPage = new ProductPage(page);