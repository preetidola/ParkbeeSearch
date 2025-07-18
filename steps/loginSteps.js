const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');
const assert = require('assert');

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.open();
});

When('I login with {string} and {string}',{ timeout: 10000 }, async function (username, password) {
  await this.loginPage.login(username, password);
});

Then('I should see the dashboard', async function () {
  const isVisible = await this.loginPage.isDashboardVisible();
  console.log('Inventory container visible:', isVisible);
  assert.strictEqual(isVisible, true, 'Dashboard should be visible after login');
});
