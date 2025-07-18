const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs =  require('fs');
const path = require('path');

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if(scenario.result.status == 'FAILED') {
    const screenshotPath = path.resolve(`screenshots/${new Date().toISOString()}--failed.png`);
    await this.page.screenshot({path: screenshotPath, fullpage: true});
    console.log(`Screenshot saved at : ${screenshotPath}`);
  }


  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
