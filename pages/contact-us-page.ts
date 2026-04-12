import { Locator, Page, expect }  from '@playwright/test';
import { testDataContactUs } from '../tests/fixtures/testDataContactUs';
import path from 'path';

  //Test Case 6: Test Case 6: Contact Us Form
export class ContactUsPage {
constructor(private page: Page) {}
   
async openContactUsPage () {
   await this.page.goto('/contact_us');
}
  private get signupName() { return this.page.locator('input[data-qa="name"]'); }
  private get signupEmail() { return this.page.locator('input[data-qa="email"]'); }
  private get signupSubject() { return this.page.locator('input[data-qa="subject"]'); }
  private get signupMessage() { return this.page.locator('textarea[data-qa="message"]'); }
  private get fileInput() { return this.page.locator('input[type="file"]'); }
  private get submitButton() { return this.page.locator('input[data-qa="submit-button"]'); }
  /// Replace the space to dot using Classname "class="status alert alert-success"
  // style="display: block;" = visible
  private get successDisplay() { return this.page.locator('.status.alert.alert-success');} 
  private get homeButton() {return this.page.locator('.btn.btn-success')}

async contactUs ( contact = testDataContactUs.contactusFill.contactusValid) {

    await expect (this.page.getByText('Get In Touch')).toBeVisible();
    await this.signupName.fill(contact.name);
    await this.signupEmail.fill(contact.email);
    await this.signupSubject.fill(contact.subject);
    await this.signupMessage.fill(contact.yourMessage);
    const filePath = path.resolve(__dirname, '../tests/files/ToothlessBG.jpg'); 
    //const filePath = path.join(__dirname, '../tests/files/ToothlessBG.jpg'); -OPTION 2
    await this.fileInput.setInputFiles(filePath);
     //Pop up dialog
    this.page.once('dialog', async (dialog) => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept(); //
    });
    await this.submitButton.click();
    //validate first if the class is visible
    await expect(this.successDisplay).toBeVisible();
    await expect(this.successDisplay).toHaveText(/submitted successfully/i); //More safer 
    //await expect(this.successDisplay.getByText('Success! Your details have been submitted successfully')).toBeVisible(); - OPTION 2
    //await expect(this.successDisplay).toHaveText(/Success! Your details have been submitted successfully/i); - OPTION 3
    await this.homeButton.click();
    await expect (this.page).toHaveURL('/');
    //await expect(this.page).toHaveURL(/.*home/); - OPTION 2
  }

//Validate the Contact us page
private get validateContactUs() {return this.page.getByRole('heading', { name: 'Contact Us' });}

async contactUsValidation() {
  await expect(this.validateContactUs).toBeVisible();
  }

}

