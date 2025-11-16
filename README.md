# ParkBee Playwright-Cucumber-JS

This repository contains **automated end-to-end tests** for the ParkBee application using:

- **Playwright** for browser automation  
- **Cucumber.js** for BDD-style feature files  
- **TypeScript** for step definitions  
- **cucumber-html-reporter** for generating HTML reports  
- **GitHub Actions** for CI/CD

The tests cover scenarios such as:
 1. Booking tab shows an error when searching with an empty location
 2. Selecting an autocomplete location navigates to the search results page automatically

---

## Project Structure

.
├── tests/
│ └── features/ # Cucumber feature files
├── steps/ # Step definitions
├── support/ # Hooks (Before, After, AfterAll)
├── reports/ # HTML and JSON reports, screenshots
├── package.json
├── tsconfig.json
├── generate-report.js # Script to generate HTML report from JSON
└── README.md


---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/preetidola/ParkbeeSearch.git
cd ParkbeeSearch

2. Install dependencies
npm install

3. Install TypeScript and Cucumber dev tools
npm install --save-dev typescript ts-node @types/node @cucumber/cucumber

4. Install Playwright and browsers
npm install --save-dev playwright
npx playwright install


5. Running Tests Locally
npm run test:report

6. CI / Headless Mode
GitHub Actions automatically runs Playwright in headless mode on Linux runners.

7. HTML Report
After running tests, the HTML report is generated at:
reports/cucumber_report.html

8. GitHub Actions CI
Workflow: .github/workflows/test.yml