import { Page, Locator } from 'playwright';

export class HomePage {
  private page: Page;
  searchInput: Locator;
  searchButton: Locator;
  searchLabel: Locator;

  // New locators for the FROM and UNTIL timestamps
  fromTime: Locator;
  untilTime: Locator;

  constructor(page: Page) {
    this.page = page;

    // Search input
    this.searchInput = this.page.locator('input[placeholder="Search place or address"]');
    // Search button
    this.searchButton = this.page.locator('button:has-text("Search")');
    // Parent wrapper of search input (for error outline)
    this.searchLabel = this.searchInput.locator('xpath=..');

    // These two <p> tags appear in order: FROM is the first, UNTIL is the second
    const dateBlock = page.locator('div', {
        has: page.locator('ng-icon[name="mat-calendar-today"]')
      });
    this.fromTime = dateBlock.locator('p.body-small-2').first();
    this.untilTime = dateBlock.locator('p.body-small-2').nth(1);
      }

  async goto() {
    await this.page.goto('https://uat.parkbee.com/en');
  }

  async typeLocation(text: string) {
    await this.searchInput.click();
    await this.searchInput.pressSequentially(text, { delay: 100 }); 
  }

 async selectSuggestion(fullText: string) {
  // Locate the <li> whose combined <span> text contains the full text
  const option = this.page.locator('ul > li', {
    has: this.page.locator('div >> span', { hasText: fullText.split(' ')[0] }) // partial match first word
  });

  // Wait for the first matching option to be visible
  await option.first().waitFor({ state: 'visible', timeout: 10000 });
  // Click it
  await option.first().click();
}

  async clickSearch() {
    await this.searchButton.click();
  }

  getRoundedTimes() {
  const now = new Date();
  const currentMinutes = now.getMinutes();

  let fromDate = new Date(now);

  // --- Special ParkBee rounding rules ---
  if (currentMinutes >= 40 && currentMinutes <= 44) {
    // Example: 04:40–04:44 → 05:00
    fromDate.setHours(fromDate.getHours() + 1, 0, 0, 0);
  } 
  else if (currentMinutes >= 45) {
    // Example: 04:45–04:59 → 05:15
    fromDate.setHours(fromDate.getHours() + 1, 15, 0, 0);
  } 
  else {
    // NORMAL ROUNDING TO NEXT 15-MINUTE INTERVAL
    const remainder = currentMinutes % 15;
    const addMinutes = remainder === 0 ? 30 : 30 - remainder;
    fromDate.setMinutes(currentMinutes + addMinutes, 0, 0);
  }

  // UNTIL = FROM + 2 HOURS
  const untilDate = new Date(fromDate);
  untilDate.setHours(fromDate.getHours() + 2);

  const format = (date: Date) =>
    date
      .toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      

  return {
    from: format(fromDate),   // e.g. "Nov 16 05:15"
    until: format(untilDate)  // e.g. "Nov 16 07:15"
  };
}
}