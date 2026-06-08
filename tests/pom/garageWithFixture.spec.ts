import { expect } from '@playwright/test';
import { test } from '../../utils/fixtures/pagesFixture';

test.describe('Garage Page Tests', () => {
    test.use({ storageState: 'playwright/.auth/auth.json' });

    test.beforeEach(async ({ garagePage }) => {
        await garagePage.navigate();
        await garagePage.openAddCarForm();
    });

    test('Add new car - BMW X5', async ({
        garagePage,
        addCarFormWithCarRemoval,
    }) => {
        await addCarFormWithCarRemoval.fillInFormAndAddCar('BMW', 'X5', 1000);
        await garagePage.verifyCarIsAdded('BMW X5', 1000);
    });

    test('Add new car - Audi Q7', async ({
        garagePage,
        addCarFormWithCarRemoval,
    }) => {
        await addCarFormWithCarRemoval.fillInFormAndAddCar('Audi', 'Q7', 2000);
        await garagePage.verifyCarIsAdded('Audi Q7', 2000);
    });

    test('Add new car without mileage', async ({ addCarForm }) => {
        await addCarForm.selectBrand('Ford');
        await addCarForm.selectModel('Focus');
        await addCarForm.triggerMileageErrorMessage();

        await expect(addCarForm.mileageRequiredMessage).toBeVisible();
        await expect(addCarForm.addButton).toBeDisabled();
    });

    test('Close "Add a car" form via "Cancel" button', async ({
        addCarForm,
    }) => {
        await addCarForm.cancelAdding();
        await expect(addCarForm.addCarHeader).not.toBeVisible();
    });

    test('Close "Add a car" form via "Close" icon', async ({ addCarForm }) => {
        await addCarForm.closeAddCarForm();
        await expect(addCarForm.addCarHeader).not.toBeVisible();
    });
});
