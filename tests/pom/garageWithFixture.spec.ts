import { expect } from '@playwright/test';
import { testUser1 } from '../../test-data/testUsers';
import { test } from '../../utils/fixtures/pagesFixture';

test.describe('Garage Page Tests', () => {
    test.beforeEach(
        'Open site and Sign In form',
        async ({ garagePage, homePage, signInForm }) => {
            await homePage.navigate();
            await homePage.openSignInForm();
            await signInForm.signInWithCredentials(
                testUser1.email,
                testUser1.password,
            );
            await garagePage.verifyOnGaragePage();
            await garagePage.openAddCarForm();
        },
    );

    test('Add new car - BMW X5', async ({ garagePage, addCarForm }) => {
        await addCarForm.fillInFormAndAddCar('BMW', 'X5', 1000);
        await garagePage.verifyCarIsAdded('BMW X5', 1000);
    });

    test('Add new car - Audi Q7', async ({ garagePage, addCarForm }) => {
        await addCarForm.fillInFormAndAddCar('Audi', 'Q7', 2000);
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
