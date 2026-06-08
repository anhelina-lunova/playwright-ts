import { test as base, Page } from '@playwright/test';
import { GaragePage } from '../../pom/pages/GaragePage';
import { HomePage } from '../../pom/pages/HomePage';
import { SignInForm } from '../../pom/forms/SignInForm';
import { AddCarForm } from '../../pom/forms/AddCarForm';

type Pages = {
    garagePage: GaragePage;
    homePage: HomePage;
    signInForm: SignInForm;
    addCarForm: AddCarForm;
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
});

export { expect } from '@playwright/test';
