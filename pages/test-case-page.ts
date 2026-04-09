import { expect, Locator, Page} from '@playwright/test';

export class testCasePage {

    constructor(private page: Page) {}
    
    async openTestCasePage () {
        await this.page.goto('/');
    }
      private get clickTestCaseLink() { return this.page.locator('a[href="/test_cases"]') }
      private get validateTestCase()  { return this.page.locator('.title.text-center')}
      private get validateBelowList() { return this.page.locator('div.panel-group h5 span')}


                                                               
    async testCase () {
        await this.clickTestCaseLink.first().click();
        await expect (this.validateTestCase).toHaveText('Test Cases');
        await expect (this.validateBelowList).toHaveText('Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:');
        await expect (this.validateBelowList).toHaveCSS('color', 'rgb(255, 0, 0)');
        await expect (this.page.goto('/products'));

      }
}