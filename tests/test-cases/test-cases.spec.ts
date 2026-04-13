import { test } from '@playwright/test';
import { TestCasePage} from '../../pages/test-case-page';

//Test Case 7: Verify Test Cases Page
test.describe ('Test cases Page', () => {

    test('Verify Test Cases Page', async ({page}) => {
       const  testCasesPages = new TestCasePage(page);
       await testCasesPages.openTestCasePage();
       await testCasesPages.verifyTestCasePage();

    })
})
