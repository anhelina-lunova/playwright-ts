import { test, expect } from '@playwright/test';
import { HomePage } from '../../../../pom/pages/HomePage';
import { SignInForm } from '../../../../pom/forms/SignInForm';
import { GaragePage } from '../../../../pom/pages/GaragePage';
import { testUser1 } from '../../../../test-data/testUsers';
import { AddCarForm } from '../../../../pom/forms/AddCarForm';

test.describe('Garage Page Tests', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;
    let addCarForm: AddCarForm;

    test.beforeEach('Open site and Sign In form', async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        addCarForm = new AddCarForm(page);

        await homePage.navigate();
        await homePage.openSignInForm();
        await signInForm.signInWithCredentials(
            testUser1.email,
            testUser1.password,
        );
        await garagePage.verifyOnGaragePage();
        await garagePage.openAddCarForm();
    });

    test('Add new car - BMW X5', async () => {
        await addCarForm.fillInFormAndAddCar('BMW', 'X5', 1000);
        await garagePage.verifyCarIsAdded('BMW X5', 1000);
    });

    test('Add new car - Audi Q7', async () => {
        await addCarForm.fillInFormAndAddCar('Audi', 'Q7', 2000);
        await garagePage.verifyCarIsAdded('Audi Q7', 2000);
    });

    test('Add new car without mileage', async () => {
        await addCarForm.selectBrand('Ford');
        await addCarForm.selectModel('Focus');
        await addCarForm.triggerMileageErrorMessage();

        await expect(addCarForm.mileageRequiredMessage).toBeVisible();
        await expect(addCarForm.addButton).toBeDisabled();
    });

    test('Close "Add a car" form via "Cancel" button', async () => {
        await addCarForm.cancelAdding();
        await expect(addCarForm.addCarHeader).not.toBeVisible();
    });

    test('Close "Add a car" form via "Close" icon', async () => {
        await addCarForm.closeAddCarForm();
        await expect(addCarForm.addCarHeader).not.toBeVisible();
    });
});
