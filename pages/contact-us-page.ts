import { Locator, Page, expect }  from '@playwright/test';
import { testDataContactUs } from '../tests/fixtures/testDataContactUs';
import path from 'path';

export class contactusPage {
constructor(private page: Page) {}
   
async openContactUsPage () {
   await this.page.goto('/contact_us');
}
  private get signupName() { return this.page.locator('input[data-qa="name"]'); }
  private get signupEmail() { return this.page.locator('input[data-qa="email"]'); }
  private get signupsubject() { return this.page.locator('input[data-qa="subject"]'); }
  private get signupmessage() { return this.page.locator('textarea[data-qa="message"]'); }
  private get fileInput() { return this.page.locator('input[type="file"]'); }
  private get submitButton() { return this.page.locator('input[data-qa="submit-button"]'); }
  /// Replace the space to dot using Classname "class="status alert alert-success"
  // style="display: block;" = visible
  private get successDisplay() { return this.page.locator('.status.alert.alert-success');} 
  private get clickHome() {return this.page.locator('.btn.btn-success')}

async contactUs ( contact = testDataContactUs.contactusFill.contactusValid) {

    await expect (this.page.getByText('Get In Touch')).toBeVisible();
    await this.signupName.fill(contact.name);
    await this.signupEmail.fill(contact.email);
    await this.signupsubject.fill(contact.subject);
    await this.signupmessage.fill(contact.yourMessage);
    const filePath = path.join(__dirname, '../tests/files/ToothlessBG.jpg');
    await this.fileInput.setInputFiles(filePath);
     //Pop up dialog
    this.page.once('dialog', async (dialog) => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept(); //
    });
    await this.submitButton.click();
    //validate first if the class is visible
    await expect(this.successDisplay).toBeVisible();
    await expect(this.successDisplay.getByText('Success! Your details have been submitted successfully')).toBeVisible();
    //await expect(this.successDisplay).toHaveText(/Success! Your details have been submitted successfully/i); - OPTION 2
    await this.clickHome.click();
    await expect (this.page).toHaveURL('');
  }
}

