import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    private readonly pageHeading: Locator = this.page.getByRole('heading', {
        name: 'Garage',
    });
    private readonly myProfile: Locator = this.page.getByRole('button', {
        name: 'User photo My profile',
    });
    private readonly logOutButton: Locator = this.page.getByRole('button', {
        name: 'Logout',
    });

    async verifyOnGaragePage() {
        await expect(this.pageHeading).toBeVisible();
    }

    async logOut() {
        await this.myProfile.click();
        await this.logOutButton.click();
    }
}
