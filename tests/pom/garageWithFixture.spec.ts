import { expect } from '@playwright/test';
import { test } from '../../utils/fixtures/pagesFixture';

test.describe('Garage Page Tests', () => {
    // test.use({ storageState: 'playwright/.auth/testuser1.json' });

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

    test('Add new car without mileage', async ({ addCarFormAsUser1 }) => {
        await addCarFormAsUser1.selectBrand('Ford');
        await addCarFormAsUser1.selectModel('Focus');
        await addCarFormAsUser1.triggerMileageErrorMessage();

        await expect(addCarFormAsUser1.mileageRequiredMessage).toBeVisible();
        await expect(addCarFormAsUser1.addButton).toBeDisabled();
    });

    test('Close "Add a car" form via "Cancel" button', async ({
        addCarFormAsUser2,
    }) => {
        await addCarFormAsUser2.cancelAdding();
        await expect(addCarFormAsUser2.addCarHeader).not.toBeVisible();
    });

    test('Close "Add a car" form via "Close" icon', async ({ addCarForm }) => {
        await addCarForm.closeAddCarForm();
        await expect(addCarForm.addCarHeader).not.toBeVisible();
    });
});
