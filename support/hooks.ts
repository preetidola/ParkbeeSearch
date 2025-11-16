import { Before, After, AfterAll,Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import reporter from 'cucumber-html-reporter';

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {

  const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');

  // ALWAYS create folder FIRST
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  if (scenario.result?.status === Status.FAILED) {
    const filePath = path.join(
      screenshotDir,
      `${new Date().toISOString()}--failed.png`
    );

    // Page exists only if Before hook succeeded
    if (this.page) {
      await this.page.screenshot({ path: filePath, fullPage: true });
    }
  }

  await this.context?.close();
  await this.browser?.close();
});

AfterAll(async function () {
  const options: any = {
    theme: 'bootstrap',
    jsonFile: path.join(process.cwd(), 'reports', 'cucumber_report.json'),
    output: path.join(process.cwd(), 'reports', 'cucumber_report.html'),
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
      "App Version": "1.0.0",
      "Test Environment": "STAGING",
      "Browser": "Chrome",
      "Platform": "Windows 10",
      "Executed": "Local"
    }
  };


});
