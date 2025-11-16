import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { HomePage } from '../pages/HomePage';
import { CustomWorld } from '../support/world';

Given('I am on the ParkBee homepage', async function (this: CustomWorld) {
  this.homePage = new HomePage(this.page);
  await this.homePage.goto();
});

When(
  'I type {string} in the search field',
  { timeout: 10000 },
  async function (this: CustomWorld, text: string) {
    await this.homePage!.typeLocation(text);
  }
);

When('I click the booking search button', async function (this: CustomWorld) {
  await this.homePage!.clickSearch();
});

When('I select {string} from suggestions', async function (this: CustomWorld, text: string) {
  await this.homePage!.selectSuggestion(text);
});

Then('the search field should display an error outline', async function (this: CustomWorld) {
  await expect(this.homePage!.searchLabel).toHaveAttribute('status', 'error');
});

Then('I should be navigated to the search results page', async function (this: CustomWorld) {
  await this.page!.waitForURL(/maps-web-uat\.parkbee\.com/);
});

Then('I should see recommended location', async function (this: CustomWorld) {
  // Wait for the "Recommended for you" heading to appear
  const recommendedHeading = this.page!.locator('h3', { hasText: 'Recommended for you' });
  await recommendedHeading.waitFor({ state: 'visible', timeout: 50000 });
  // Optional: assert it is visible
  await expect(recommendedHeading).toBeVisible();
});

Then('the map should be visible', async function (this: CustomWorld) {
  const mapCanvas = this.page!.locator('canvas.mapboxgl-canvas');
  await mapCanvas.waitFor({ state: 'visible', timeout: 15000 });
  await expect(mapCanvas).toBeVisible();
});

Then('I should see the auto-filled from and until date\\/time', async function (this: CustomWorld) {
 
  const expected = this.homePage!.getRoundedTimes();

  // Use regex because Playwright will see the <ng-icon> before the text
  
    const fromRegex = new RegExp(expected.from);
    const untilRegex = new RegExp(expected.until);
    const text = await this.homePage!.fromTime.textContent();
  
    await expect(this.homePage!.fromTime).toHaveText(expected.from, {
      timeout: 15000
    });

    await expect(this.homePage!.untilTime).toHaveText(expected.until, {
      timeout: 15000
    });
  });
