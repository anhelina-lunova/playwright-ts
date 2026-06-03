import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    private readonly pageHeading: Locator = this.page.getByRole('heading', {
        name: 'Garage',
    });

    async verifyOnGaragePage() {
        await expect(this.pageHeading).toBeVisible();
    }
}
