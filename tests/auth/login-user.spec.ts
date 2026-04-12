import { defineConfig, test } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { testData } from '../fixtures/testDataLogin';
import { describe } from 'node:test';
import { testCasePage } from '../../pages/test-case-page';
import { productPage } from '../../pages/products-page';

// test.beforeEach(async ({page})  => {
//     const login = new LoginPage(page);
//     await login.openLoginPage();
// )};

test.describe('Login page', () => {
  test('Valid user login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.openLoginPage();
    await login.loginAdmin(testData.users.admin);
    await login.logout();
  });

  test('Invalid username and password', async ({page}) => {
    const login = new LoginPage(page);
    await login.openLoginPage();
    await login.loginIncorrectpass(testData.users.incorrectpass)
  });

  test ('Register User with existing email', async ({page}) => {
    const login = new LoginPage(page);
    await login.openLoginPage();
    await login.existingUser(testData.userSignup.existingUser)
  });

});


// test.describe('Test Case Page', () => {

//     test('Test Case Validation', async ({page}) => {
//         const newPageTestCase = new testCasePage(page);
//         await newPageTestCase.openTestCasePage();
//         await newPageTestCase.testCase();  
//     })
// });

// test.describe('Product Page', () => {

//   test('Products Page Validation', async ({page}) => {
//       const newProductPage = new productPage(page);
//       await newProductPage.openProductPage();
//       await newProductPage.productPage();

//   })

// });

