import {test} from '@playwright/test'
import { ProductPage } from '../../pages/products-page'


test.describe('Search Product', () => {

    test('Verify search product', async ({page}) => {
        const searchProduct = new ProductPage(page);
        await searchProduct.openProductPage();
        await searchProduct.verifySearchProductWithExactCount();
        // await searchProduct.verifySerchProductGreaterThan();

    })

})