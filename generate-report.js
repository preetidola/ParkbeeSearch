const reporter = require('cucumber-html-reporter');
const path = require('path');

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(process.cwd(), 'reports', 'cucumber_report.json'),
  output: path.join(process.cwd(), 'reports', 'cucumber_report.html'),
  reportSuiteAsScenarios: true,
  launchReport: false,
  storeScreenshots: true,
  screenshotsDirectory: 'reports/screenshots',
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chrome",
    "Platform": "Windows 10",
    "Executed": "Local"
  }
};

reporter.generate(options);
console.log("HTML report created!");
process.exit(0); 
