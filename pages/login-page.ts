import { Page, expect } from '@playwright/test';
import { testData } from '../tests/fixtures/testDataLogin';

export class LoginPage {
  constructor(private page: Page) {}
  
  async openLoginPage() {
    await this.page.goto('/login');
  }
  private selectors = {
      signupLoginLink: 'Signup / Login', ///get by text
      signupName: 'input[data-qa="signup-name"]',
      signupEmail: 'input[data-qa="signup-email"]',
      sigupButton: 'button[data-qa="signup-button"]', ///get by button
      loginEmail: 'input[data-qa="login-email"]',
      loginPassword: 'input[data-qa="login-password"]',
      loginButton:'button[data-qa="login-button"]', ///get by button
      logoutButton: 'a[href="/logout"]',
  }
  //Test Case 1: Register User
 async newUserSignup( user = testData.userSignup.newUser) {
    await this.page.getByText(this.selectors.signupLoginLink).click();
    await this.page.fill(this.selectors.signupName, user.name);
    await this.page.fill(this.selectors.signupEmail, user.email);
    await this.page.click(this.selectors.sigupButton);
 }
  //Test Case 2: Login User with correct email and password - Admin
  async loginAdmin(user = testData.users.admin) {
    await this.page.getByText(this.selectors.signupLoginLink).click();  
    await this.page.fill(this.selectors.loginEmail, user.username);
    await this.page.fill(this.selectors.loginPassword, user.password);
    await this.page.click(this.selectors.loginButton);
    await expect(this.page.getByText('Logged in as')).toBeVisible();
  }
  //Test Case 2.1: Login User with correct email and password-Guest
  async loginGuest(user = testData.users.guest) {
    await this.page.getByText(this.selectors.signupLoginLink).click();
    await this.page.fill(this.selectors.loginEmail,user.username);
    await this.page.fill(this.selectors.loginPassword, user.password);
    await this.page.click(this.selectors.loginButton);
    await expect(this.page.getByText('Logged in as')).toBeVisible();
  }
  //Test Case 3: Login User with incorrect email and password
  async loginIncorrectpass( user = testData.users.incorrectpass){
    await this.page.getByText(this.selectors.signupLoginLink).click();
    await this.page.fill(this.selectors.loginEmail, user.username);
    await this.page.fill(this.selectors.loginPassword, user.password);
    await this.page.click(this.selectors.loginButton); 
    await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
  }
  //Test Case 4: Logout User
  async logout() {
    await this.page.click(this.selectors.logoutButton);  ///get by href 
    await expect(this.page).toHaveURL('/login'); //Expect test Assertions URL
  }
  //Test Case 5: Register User with existing email
  async existingUser( user = testData.userSignup.existingUser) {
    await this.page.getByText(this.selectors.signupLoginLink).click();
    await this.page.fill(this.selectors.signupName, user.name);
    await this.page.fill(this.selectors.signupEmail, user.email);
    await this.page.click(this.selectors.sigupButton);
    await expect(this.page.getByText('Email Address already exist!')).toBeVisible();
    await expect(this.page.getByText('Login to your account')).toBeVisible();
  }
}



        



