import { test } from '../../utils/fixtures/pagesFixture';
import { testUser1, testUser2 } from '../../test-data/testUsers';

test('Login as TestUser1 and save storage state', async ({
    homePage,
    signInForm,
    garagePage,
    context,
}) => {
    await homePage.navigate();
    await homePage.openSignInForm();
    await signInForm.signInWithCredentials(testUser1.email, testUser1.password);
    await garagePage.verifyOnGaragePage();

    await context.storageState({ path: 'playwright/.auth/testuser1.json' });
    await context.close();
});

test('Login as TestUser2 and save storage state', async ({
    homePage,
    signInForm,
    garagePage,
    context,
}) => {
    await homePage.navigate();
    await homePage.openSignInForm();
    await signInForm.signInWithCredentials(testUser2.email, testUser2.password);
    await garagePage.verifyOnGaragePage();

    await context.storageState({ path: 'playwright/.auth/testuser2.json' });
    await context.close();
});
