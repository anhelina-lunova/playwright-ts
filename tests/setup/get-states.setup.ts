import { test } from '@playwright/test';
import { HomePage } from '../../pom/pages/HomePage';
import { SignInForm } from '../../pom/forms/SignInForm';
import { GaragePage } from '../../pom/pages/GaragePage';
import { testUser1 } from '../../test-data/testUsers';

let homePage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

test('Login as TestUser1 and save storage state', async ({ page, context }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);

    await homePage.navigate();
    await homePage.openSignInForm();
    await signInForm.signInWithCredentials(testUser1.email, testUser1.password);
    await garagePage.verifyOnGaragePage();
    // Adding Storage State
    await context.storageState({ path: 'playwright/.auth/auth.json' });
});
