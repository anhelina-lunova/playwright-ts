import { test } from '../../utils/fixtures/pagesFixture';
import { testUser1, testUser2 } from '../../test-data/testUsers';

test('Login as TestUser1 and save storage state', async ({ context, app }) => {
    await app.homePage.navigate();
    await app.homePage.openSignInForm();
    await app.signInForm.signInWithCredentials(
        testUser1.email,
        testUser1.password,
    );
    await app.garagePage.verifyOnGaragePage();

    await context.storageState({ path: 'playwright/.auth/testuser1.json' });
    await context.close();
});

test('Login as TestUser2 and save storage state', async ({ context, app }) => {
    await app.homePage.navigate();
    await app.homePage.openSignInForm();
    await app.signInForm.signInWithCredentials(
        testUser2.email,
        testUser2.password,
    );
    await app.garagePage.verifyOnGaragePage();

    await context.storageState({ path: 'playwright/.auth/testuser2.json' });
    await context.close();
});
