import { Page } from 'playwright';

export class ResultsPage {
  constructor(private page: Page) {}

  editSection = this.page.locator('[data-testid="search-summary"]');
  mapPins = this.page.locator('.mapboxgl-marker');
  totalDuration = this.page.locator('[data-testid="duration"]');

  async waitForResults() {
    await this.page.waitForURL(/maps-web-uat\.parkbee\.com/);
  }

  async openEditForm() {
    await this.editSection.click();
  }
}
