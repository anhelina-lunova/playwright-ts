import { expect, test as setup } from '../../utils/fixtures/pagesFixture';
import { testUser1, testUser2 } from '../../test-data/testUsers';
import AuthService from '../../utils/api/services/AuthService';

setup.describe.skip('Get Storage State via UI', () => {
    setup(
        'Login as TestUser1 and save storage state',
        async ({ context, app }) => {
            await app.homePage.navigate();
            await app.homePage.openSignInForm();
            await app.signInForm.signInWithCredentials(
                testUser1.email,
                testUser1.password,
            );
            await app.garagePage.verifyOnGaragePage();

            await context.storageState({
                path: 'playwright/.auth/testuser1.json',
            });
            await context.close();
        },
    );

    setup(
        'Login as TestUser2 and save storage state',
        async ({ context, app }) => {
            await app.homePage.navigate();
            await app.homePage.openSignInForm();
            await app.signInForm.signInWithCredentials(
                testUser2.email,
                testUser2.password,
            );
            await app.garagePage.verifyOnGaragePage();

            await context.storageState({
                path: 'playwright/.auth/testuser2.json',
            });
            await context.close();
        },
    );
});

setup.describe('Get Storage State via API', () => {
    setup('Login as TestUser1 and save storage state', async ({ request }) => {
        const authService = new AuthService(request);
        const response = await authService.signIn(
            testUser1.email,
            testUser1.password,
        );
        expect(response.status()).toBe(200);
        await request.storageState({ path: 'playwright/.auth/testuser1.json' });
    });

    setup('Login as TestUser2 and save storage state', async ({ request }) => {
        const authService = new AuthService(request);
        const response = await authService.signIn(
            testUser2.email,
            testUser2.password,
        );
        expect(response.status()).toBe(200);
        await request.storageState({ path: 'playwright/.auth/testuser2.json' });
    });
});
