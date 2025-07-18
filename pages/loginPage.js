class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = 'input[name="user-name"]';
    this.passwordField = 'input[name="password"]';
    this.loginButton = '#login-button';
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

 async isDashboardVisible() {
  try {
    await this.page.waitForSelector('#inventory_container', { timeout: 5000 });
    return true;
  } catch (e) {
    return false;
  }
}

}

module.exports = LoginPage;
