import { expect } from '@playwright/test';
import { test } from '../../utils/fixtures/pagesFixture';

test.describe('Garage Page Tests', () => {
    test.use({ storageState: 'playwright/.auth/testuser1.json' });

    test.beforeEach(async ({ app }) => {
        await app.garagePage.navigate();
        await app.garagePage.openAddCarForm();
    });
    test.describe('Adding cars', () => {
        test.afterEach(async ({ app }) => {
            await app.garagePage.openEditCarForm(0);
            await app.editCarForm.removeCar();
            await app.removeCarForm.confirmCarRemoval();
            await app.garagePage.verifyCarIsRemoved();
        });

        test('Add new car - BMW X5', async ({ app }) => {
            await app.addCarForm.fillInFormAndAddCar('BMW', 'X5', 1000);
            await app.garagePage.verifyCarIsAdded('BMW X5', 1000);
        });

        test('Add new car - Audi Q7', async ({ app }) => {
            test.step('Add new car Audi Q7 to Garage', async () => {
                await app.addCarForm.fillInFormAndAddCar('Audi', 'Q7', 2000);
            });
            test.step('Verify Audi Q7 is added to Garage', async () => {
                await app.garagePage.verifyCarIsAdded('Audi Q7', 2000);
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
