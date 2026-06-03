import { Locator, Page, expect } from '@playwright/test';

export class GaragePage {
    private readonly page: Page;
    private readonly pageHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: 'Garage' });
    }

    async verifyOnGaragePage() {
        await expect(this.pageHeading).toBeVisible();
    }
}
