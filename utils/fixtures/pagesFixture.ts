import { test as base, Page } from '@playwright/test';
import { GaragePage } from '../../pom/pages/GaragePage';
import { HomePage } from '../../pom/pages/HomePage';
import { SignInForm } from '../../pom/forms/SignInForm';
import { AddCarForm } from '../../pom/forms/AddCarForm';
import { EditCarForm } from '../../pom/forms/EditCarForm';
import { RemoveCarForm } from '../../pom/forms/RemoveCarForm';

type Pages = {
    garagePage: GaragePage;
    homePage: HomePage;
    signInForm: SignInForm;
    addCarForm: AddCarForm;
    editCarForm: EditCarForm;
    removeCarForm: RemoveCarForm;
    addCarFormWithCarRemoval: AddCarForm;
};

export const test = base.extend<Pages>({
    garagePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        await use(garagePage);
        console.log('Test with garage page fixture is finished!');
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
        console.log('Test with home page fixture is finished!');
    },
    signInForm: async ({ page }, use) => {
        const signInForm = new SignInForm(page);
        await use(signInForm);
        console.log('Test with sign in form fixture is finished!');
    },
    addCarForm: async ({ page }, use) => {
        const addCarForm = new AddCarForm(page);
        await use(addCarForm);
        console.log('Test with add car form fixture is finished!');
    },
    editCarForm: async ({ page }, use) => {
        const editCarForm = new EditCarForm(page);
        await use(editCarForm);
        console.log('Test with edit car form fixture is finished!');
    },
    removeCarForm: async ({ page }, use) => {
        const removeCarForm = new RemoveCarForm(page);
        await use(removeCarForm);
        console.log('Test with remove car form fixture is finished!');
    },
    addCarFormWithCarRemoval: async (
        { addCarForm, editCarForm, removeCarForm, garagePage },
        use,
    ) => {
        await use(addCarForm);
        await garagePage.openEditCarForm(0);
        await editCarForm.removeCar();
        await removeCarForm.confirmCarRemoval();
        await garagePage.verifyCarIsRemoved();
        console.log(
            'Test with add car form and remove car fixtures is finished!',
        );
    },
});

export { expect } from '@playwright/test';
