import { test } from '@playwright/test';  //Playwright Core
import { ContactUsPage } from '../../pages/contact-us-page';
import { testDataContactUs } from '../fixtures/testDataContactUs';


//Test Case 6: Test Case 6: Contact Us Form

test.describe('Contact Page', () => {

test('User can submit Contact Us form successfully', async ({page}) => {
    const contactPage = new ContactUsPage(page);
    await contactPage.openContactUsPage ();
    await contactPage.contactUsValidation();
    await contactPage.contactUs(testDataContactUs.contactusFill.contactusValid);
  
    })

})