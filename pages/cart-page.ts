import { Page, expect} from '@playwright/test'


///Test Case 7: Verify Test Cases Page
export class CartPage {
    constructor(private page: Page) {}

async openCartPage() {
    await this.page.goto('/');

}
//   private get testCasesTitle() {
//     return this.page.getByRole('heading', { name: /Test Cases/i})  ///Regex 
//   }
  private get testCasesTitle() {
  return this.page.getByRole('heading', { name: 'Test Cases' });  //Make sure to use string for the match is known
    }


}