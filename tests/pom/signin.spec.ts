import { test, expect } from '@playwright/test';
import { HomePage } from '../../pom/pages/HomePage';
import { SignInForm } from '../../pom/forms/SignInForm';
import { GaragePage } from '../../pom/pages/GaragePage';
import { testUser1, errorMessageColor } from '../../test-data/testUsers';
import {
    generateRandomEmail,
    generateRandomPassword,
    generateWrongEmailFormat,
} from '../../utils/data/credentials';

test.describe('Sign In Tests', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach('Open site and Sign In form', async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.navigate();
        await homePage.openSignInForm();
    });

    test('Successful sign in with valid credentials', async () => {
        await signInForm.signInWithCredentials(
            testUser1.email,
            testUser1.password,
        );
        await garagePage.verifyOnGaragePage();
    });

    test('Sign in with empty email', async () => {
        await signInForm.triggerErrorOnField('email');
        await signInForm.enterPassword(testUser1.password);
        await expect(signInForm.emptyEmailMessage).toBeVisible();
        await expect(signInForm.emptyEmailMessage).toHaveCSS(
            'color',
            errorMessageColor.incorrect,
        );
    });

    test('Sign in with empty password', async () => {
        await signInForm.enterEmail(testUser1.email);
        await signInForm.triggerErrorOnField('password');
        await expect(signInForm.emptyPasswordMessage).toBeVisible();
        await expect(signInForm.emptyPasswordMessage).toHaveCSS(
            'color',
            errorMessageColor.incorrect,
        );
    });

    test('Sign in with incorrect email', async () => {
        await signInForm.enterEmail(generateWrongEmailFormat());
        await signInForm.enterPassword(testUser1.password);
        await expect(signInForm.incorrectEmailMessage).toBeVisible();
        await expect(signInForm.incorrectEmailMessage).toHaveCSS(
            'color',
            errorMessageColor.incorrect,
        );
    });

    test('Sign in with wrong credentials', async () => {
        await signInForm.signInWithCredentials(
            generateRandomEmail(),
            generateRandomPassword(),
        );
        await expect(signInForm.wrongCredentialsMessage).toBeVisible();
        await expect(signInForm.wrongCredentialsMessage).toHaveCSS(
            'color',
            errorMessageColor.wrongCredentials,
        );
    });
});
