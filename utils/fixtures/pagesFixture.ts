import { test as base, Page } from '@playwright/test';
import { GaragePage } from '../../pom/pages/GaragePage';
import { HomePage } from '../../pom/pages/HomePage';
import { SignInForm } from '../../pom/forms/SignInForm';
import { AddCarForm } from '../../pom/forms/AddCarForm';
import { EditCarForm } from '../../pom/forms/EditCarForm';
import { RemoveCarForm } from '../../pom/forms/RemoveCarForm';
import { AddExpenseForm } from '../../pom/forms/AddExpenseForm';
import { ExpensesPage } from '../../pom/pages/ExpensesPage';
import { ProfilePage } from '../../pom/pages/ProfilePage';
import { EditProfileForm } from '../../pom/forms/EditProfileForm';

type App = {
    page: Page;
    garagePage: GaragePage;
    homePage: HomePage;
    signInForm: SignInForm;
    addCarForm: AddCarForm;
    editCarForm: EditCarForm;
    removeCarForm: RemoveCarForm;
    addExpenseForm: AddExpenseForm;
    expensesPage: ExpensesPage;
    profilePage: ProfilePage;
    editProfileForm: EditProfileForm;
};

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            garagePage: new GaragePage(page),
            homePage: new HomePage(page),
            signInForm: new SignInForm(page),
            addCarForm: new AddCarForm(page),
            editCarForm: new EditCarForm(page),
            removeCarForm: new RemoveCarForm(page),
            addExpenseForm: new AddExpenseForm(page),
            expensesPage: new ExpensesPage(page),
            profilePage: new ProfilePage(page),
            editProfileForm: new EditProfileForm(page),
        };
        await use(app);
    },
    // garagePage: async ({ page }, use) => {
    //     const garagePage = new GaragePage(page);
    //     await use(garagePage);
    //     console.log('Test with garage page fixture is finished!');
    // },
    // homePage: async ({ page }, use) => {
    //     const homePage = new HomePage(page);
    //     await use(homePage);
    //     console.log('Test with home page fixture is finished!');
    // },
    // signInForm: async ({ page }, use) => {
    //     const signInForm = new SignInForm(page);
    //     await use(signInForm);
    //     console.log('Test with sign in form fixture is finished!');
    // },
    // addCarForm: async ({ page, garagePage }, use) => {
    //     const addCarForm = new AddCarForm(page);
    //     await garagePage.navigate();
    //     await garagePage.openAddCarForm();
    //     await use(addCarForm);
    //     console.log('Test with add car form fixture is finished!');
    // },
    // editCarForm: async ({ page }, use) => {
    //     const editCarForm = new EditCarForm(page);
    //     await use(editCarForm);
    //     console.log('Test with edit car form fixture is finished!');
    // },
    // removeCarForm: async ({ page }, use) => {
    //     const removeCarForm = new RemoveCarForm(page);
    //     await use(removeCarForm);
    //     console.log('Test with remove car form fixture is finished!');
    // },
    // addCarFormWithCarRemoval: async (
    //     { addCarForm, editCarForm, removeCarForm, garagePage },
    //     use,
    // ) => {
    //     await garagePage.navigate();
    //     await garagePage.openAddCarForm();
    //     await use(addCarForm);
    //     await garagePage.openEditCarForm(0);
    //     await editCarForm.removeCar();
    //     await removeCarForm.confirmCarRemoval();
    //     await garagePage.verifyCarIsRemoved();
    //     console.log(
    //         'Test with add car form and remove car fixtures is finished!',
    //     );
    // },
    // addCarFormAsUser1: async ({ browser }, use) => {
    //     const context = await browser.newContext({
    //         storageState: 'playwright/.auth/testuser1.json',
    //     });
    //     const page = await context.newPage();
    //     const garagePage = new GaragePage(page);
    //     const addCarForm = new AddCarForm(page);
    //     await garagePage.navigate();
    //     await garagePage.openAddCarForm();
    //     await use(addCarForm);
    //     console.log('Test with add car form fixture as User1 is finished!');
    //     await context.close();
    // },
    // addCarFormAsUser2: async ({ browser }, use) => {
    //     const context = await browser.newContext({
    //         storageState: 'playwright/.auth/testuser2.json',
    //     });
    //     const page = await context.newPage();
    //     const garagePage = new GaragePage(page);
    //     const addCarForm = new AddCarForm(page);
    //     await garagePage.navigate();
    //     await garagePage.openAddCarForm();
    //     await use(addCarForm);
    //     console.log('Test with add car form fixture as User2 is finished!');
    //     await context.close();
    // },
});

export { expect } from '@playwright/test';
