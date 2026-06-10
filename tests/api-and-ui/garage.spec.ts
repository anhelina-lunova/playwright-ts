import { expect } from '@playwright/test';
import { test } from '../../utils/fixtures/pagesFixture';
import GarageService from '../../utils/api/services/GarageService';
import { getSidFromStorageState } from '../../utils/storage-state/storageState';

test.describe('Garage Page Tests', () => {
    let garageService: GarageService;
    test.use({ storageState: 'playwright/.auth/testuser1.json' });

    test.beforeEach(async ({ app }) => {
        await app.garagePage.navigate();
        await app.garagePage.openAddCarForm();
    });
    test.describe('Adding cars', () => {
        test.afterEach(async ({ request }) => {
            garageService = new GarageService(request);

            const sid = getSidFromStorageState(
                'playwright/.auth/testuser1.json',
            );
            const allAddedCarIds: number[] =
                await garageService.getAllUserCars(sid);
            const lastAddedCarId = allAddedCarIds[0];

            await garageService.removeCar(sid, lastAddedCarId);
        });

        test('Add new car - BMW X5', async ({ app }) => {
            await app.addCarForm.fillInFormAndAddCar('BMW', 'X5', 1000);
            await app.garagePage.verifyCarIsAdded('BMW X5', 1000);
            await expect(
                app.page.locator('.car-item').first(),
            ).toHaveScreenshot('last-added-car-bmw-x5.png', {
                mask: [app.page.locator('[name="miles"]')],
            });
        });

        test('Add new car - Audi Q7', async ({ app }) => {
            await test.step('Add new car Audi Q7 to Garage', async () => {
                await app.addCarForm.fillInFormAndAddCar('Audi', 'Q7', 1000);
            });
            await test.step('Verify Audi Q7 is added to Garage', async () => {
                await app.garagePage.verifyCarIsAdded('Audi Q7', 1000);
            });

            await app.page.screenshot({
                path: 'test-data/pages/garage/audi-q7.png',
                // fullPage: true,
            });
        });
    });

    test('Add new car without mileage', async ({ app }) => {
        await app.addCarForm.selectBrand('Ford');
        await app.addCarForm.selectModel('Focus');
        await app.addCarForm.triggerMileageErrorMessage();

        await expect(app.addCarForm.mileageRequiredMessage).toBeVisible();
        await expect(app.addCarForm.addButton).toBeDisabled();
    });

    test('Close "Add a car" form via "Cancel" button', async ({ app }) => {
        await app.addCarForm.cancelAdding();
        await expect(app.addCarForm.addCarHeader).not.toBeVisible();
    });

    test('Close "Add a car" form via "Close" icon', async ({ app }) => {
        await app.addCarForm.closeAddCarForm();
        await expect(app.addCarForm.addCarHeader).not.toBeVisible();
    });
});
