import { Locator, expect, Page } from '@playwright/test';

// Test Case 7: Verify Test Cases Page
export class TestCasePage {

  constructor(private page: Page) {}

  async openTestCasePage() {
    await this.page.goto('/');
  }

  private get testCaseLink() {
    return this.page
      .locator('#header') //This resolves the issue by targeting the header section, since multiple "Test Cases" links exist on the same page.
      .getByRole('link', { name: 'Test Cases' });
  }

  private get verifyTestCase() {
    return this.page.locator('h2.title.text-center b'); // The text is inside <b> tag
  }

  private get verifyBelowList() {
    return this.page.getByText(/Below is the list of test Cases/i);
  }

  async verifyTestCasePage() {
    await this.testCaseLink.click();
    await expect(this.page).toHaveURL(/test_cases/);
    await expect(this.verifyTestCase).toHaveText('Test Cases');
    await expect(this.verifyBelowList).toBeVisible();
    await expect(this.verifyBelowList).toHaveText(
      'Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:'
    );

    // OPTION 2
    // await expect(this.verifyBelowList).toHaveText(/Below is the list of test Cases/i);

    // CSS is not part of functional testing, this is only for practice
    await expect(this.verifyBelowList).toHaveCSS('color', 'rgb(255, 0, 0)');
  }
}

/////////////// NOTE ///////////
// The <h2> does NOT expose a proper accessible name cleanly
// The text is inside <b> tag
// So Playwright cannot reliably match it as a “heading role”

// 👉 That’s why it fails or behaves inconsistently.

