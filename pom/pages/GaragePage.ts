import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    private readonly pageHeading: Locator = this.page.getByRole('heading', {
        name: 'Garage',
    });
    private readonly myProfileMenu: Locator = this.page.getByRole('button', {
        name: 'User photo My profile',
    });
    private readonly logOutButton: Locator = this.page.getByRole('button', {
        name: 'Logout',
    });

    private readonly addCarButton: Locator = this.page.getByRole('button', {
        name: 'Add car',
    });

    private readonly lastAddedCarName: Locator = this.page
        .locator('.car_name.h2')
        .first();

    private readonly lastAddedCarMileage: Locator = this.page
        .locator('[name="miles"]')
        .first();

    private readonly successAddedMessage: Locator = this.page.locator(
        '.alert-success p',
        { hasText: 'Car added' },
    );

    private readonly successRemovedMessage: Locator = this.page.locator(
        '.alert-success p',
        { hasText: 'Car added' },
    );

    private readonly editCarIcons: Locator = this.page.locator('.icon-edit');

    // Methods

    async navigate() {
        await super.navigate('/panel/garage');
    }

    async verifyOnGaragePage() {
        await expect(this.pageHeading).toBeVisible();
    }

    async logOut() {
        await this.myProfileMenu.click();
        await this.logOutButton.click();
    }

    async openAddCarForm() {
        await this.addCarButton.click();
    }

    async verifyCarIsAdded(brandAndModelName: string, carMileage: number) {
        await expect(this.successAddedMessage).toBeVisible();
        await expect(this.lastAddedCarName).toHaveText(brandAndModelName);
        await expect(this.lastAddedCarMileage).toHaveValue(
            carMileage.toString(),
        );
    }

    async openEditCarForm(carIndex: number) {
        await this.editCarIcons.nth(carIndex).click();
    }

    async verifyCarIsRemoved() {
        await expect(this.successRemovedMessage).toBeVisible();
    }
}
