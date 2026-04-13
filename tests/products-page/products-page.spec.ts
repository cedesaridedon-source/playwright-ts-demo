import { test } from '@playwright/test'
import { ProductPage } from '../../pages/products-page'

//Test Case 8: Verify All Products and product detail page

test.describe('Product Page', () => {

    test('Verify All Products and product detail page', async ({page}) => {
        const productPage = new ProductPage(page);
        await productPage.openProductPage();
        await productPage.verifyProductPage();

    })


})