import { test, expect } from '@playwright/test';
import { HomePage } from '../../pom/pages/HomePage';
import { SignUpForm } from '../../pom/forms/SignUpForm';
import { GaragePage } from '../../pom/pages/GaragePage';
import { testUser1, errorMessageColor } from '../../test-data/testUsers';
import {
    generateRandomEmail,
    generateRandomPassword,
    getRandomValueFromArray,
} from '../../utils/data/credentials';

test.describe('Sign Up Tests', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let garagePage: GaragePage;

    test.beforeEach('Open site and Sign Up form', async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        garagePage = new GaragePage(page);

        await homePage.navigate();
        await homePage.openSignUpForm();
    });

    test.describe('Verify Sign Up with valid data', () => {
        test('Successful sign up with valid data', async () => {
            const password = generateRandomPassword();
            await signUpForm.fillInAndRegister(
                testUser1.name,
                testUser1.lastName,
                generateRandomEmail(),
                password,
                password,
            );
            await garagePage.verifyOnGaragePage();
        });

        test('Not possible to register with already registered email', async () => {
            const email = generateRandomEmail();
            const password = generateRandomPassword();
            await signUpForm.fillInAndRegister(
                testUser1.name,
                testUser1.lastName,
                email,
                password,
                password,
            );

            await garagePage.verifyOnGaragePage();
            await garagePage.logOut();
            await homePage.openSignUpForm();

            await signUpForm.fillInAndRegister(
                testUser1.name,
                testUser1.lastName,
                email,
                password,
                password,
            );

            await expect(signUpForm.userAlreadyExistMessage).toBeVisible();
            await expect(signUpForm.userAlreadyExistMessage).toHaveCSS(
                'color',
                errorMessageColor.wrongCredentials,
            );
        });
    });

    test.describe('Verify Sign Up unavailable without filling in mandatory fields', () => {
        test('Error messages are displayed if no data is filled in', async () => {
            test.fail(
                true,
                'Known defect: the "emptyNameMessage" is "Name required" instead "Name is required"',
            );
            await signUpForm.triggerErrorOnField('name');
            await signUpForm.triggerErrorOnField('lastName');
            await signUpForm.triggerErrorOnField('email');
            await signUpForm.triggerErrorOnField('password');
            await signUpForm.triggerErrorOnField('reEnterPassword');

            await expect(signUpForm.emptyNameMessage).toBeVisible();
            await expect(signUpForm.emptyLastNameMessage).toBeVisible();
            await expect(signUpForm.emptyEmailMessage).toBeVisible();
            await expect(signUpForm.emptyPasswordMessage).toBeVisible();
            await expect(signUpForm.emptyReEnterPasswordMessage).toBeVisible();

            await expect(signUpForm.registrationButton).toBeDisabled();
        });

        test('Sign up with empty name', async () => {
            test.fail(
                true,
                'Known defect: the "emptyNameMessage" is "Name required" instead "Name is required"',
            );
            const password = generateRandomPassword();
            await signUpForm.triggerErrorOnField('name');
            await signUpForm.enterLastName(testUser1.lastName);
            await signUpForm.enterEmail(generateRandomEmail());
            await signUpForm.enterPassword(password);
            await signUpForm.reEnterPassword(password);

            await expect(signUpForm.registrationButton).toBeDisabled();
            await expect(signUpForm.emptyNameMessage).toBeVisible();
            await expect(signUpForm.emptyNameMessage).toHaveCSS(
                'color',
                errorMessageColor.incorrect,
            );
        });

        test('Sign up with empty last name', async () => {
            test.fail(
                true,
                'Known defect: the "emptyLastNameMessage" is "Last name required" instead "Last name is required"',
            );
            const password = generateRandomPassword();
            await signUpForm.enterName(testUser1.name);
            await signUpForm.triggerErrorOnField('lastName');
            await signUpForm.enterEmail(generateRandomEmail());
            await signUpForm.enterPassword(password);
            await signUpForm.reEnterPassword(password);

            await expect(signUpForm.registrationButton).toBeDisabled();
            await expect(signUpForm.emptyLastNameMessage).toBeVisible();
            await expect(signUpForm.emptyLastNameMessage).toHaveCSS(
                'color',
                errorMessageColor.incorrect,
            );
        });

        test('Sign up with empty email', async () => {
            const password = generateRandomPassword();
            await signUpForm.enterName(testUser1.name);
            await signUpForm.enterLastName(testUser1.lastName);
            await signUpForm.triggerErrorOnField('email');
            await signUpForm.enterPassword(password);
            await signUpForm.reEnterPassword(password);

            await expect(signUpForm.registrationButton).toBeDisabled();
            await expect(signUpForm.emptyEmailMessage).toBeVisible();
            await expect(signUpForm.emptyEmailMessage).toHaveCSS(
                'color',
                errorMessageColor.incorrect,
            );
        });

        test('Sign up with empty password', async () => {
            const password = generateRandomPassword();
            await signUpForm.enterName(testUser1.name);
            await signUpForm.enterLastName(testUser1.lastName);
            await signUpForm.enterEmail(generateRandomEmail());
            await signUpForm.triggerErrorOnField('password');
            await signUpForm.reEnterPassword(password);

            await expect(signUpForm.registrationButton).toBeDisabled();
            await expect(signUpForm.emptyPasswordMessage).toBeVisible();
            await expect(signUpForm.emptyPasswordMessage).toHaveCSS(
                'color',
                errorMessageColor.incorrect,
            );
        });

        test('Sign up with empty re-enter password', async () => {
            const password = generateRandomPassword();
            await signUpForm.enterName(testUser1.name);
            await signUpForm.enterLastName(testUser1.lastName);
            await signUpForm.enterEmail(generateRandomEmail());
            await signUpForm.enterPassword(password);
            await signUpForm.triggerErrorOnField('reEnterPassword');

            await expect(signUpForm.registrationButton).toBeDisabled();
            await expect(signUpForm.emptyReEnterPasswordMessage).toBeVisible();
            await expect(signUpForm.emptyReEnterPasswordMessage).toHaveCSS(
                'color',
                errorMessageColor.incorrect,
            );
        });
    });

    test.describe('Verify Sign Up is unavailable without filling in correct data', () => {
        const incorrectEmails = [
            'plainaddress', // No @ sign and domain
            '@domain.com', // No username
            'username@', // No domain
            'username@.com', // Period right after @
            'username@domain.', // No TLD (com/net/ua)
            'user name@domain.com', // Space inside the address
            'username#domain.com', // Another character used instead of @
        ];
        const incorrectNames = [
            '   ', // After trim() it will be empty (Empty field)
            'John123', // Contains numbers
            'Іван', // Cyrillic (not English symbols)
            'John_Doe', // Contains special characters
            'Alex@', // Contains special characters
            '#$%', // Only special characters
        ];
        const wrongLengthNames = [
            'A', // 1 character (too short)
            ' B ', // 1 character after trim()
            'Annnnnnnnnnnnnnnnnnnnn', // 21 characters (too long)
            'VeryLongNameThatExceedsTwentyCharacters', // 40 characters
        ];
        const incorrectPasswords = [
            // --- Length violation ---
            'Short1', // 6 characters (less than 8)
            'Short12', // 7 characters (less than 8)
            'Longgggggggggggg1', // 16 characters (more than 15)

            // --- Character violation (Valid length 8-15) ---
            'onlysmallletters', // No uppercase letter or number
            'ONLYBIGLETTERS1', // No lowercase letter
            'NoDigitsHere', // No digits
            '123456789012', // Only numbers, no letters
            'Pass1234', // Valid password, but this array is strictly INCORRECT (leave for positive tests)
        ];

        test.describe('Error message is displayed if invalid data is filled in the following field: ', () => {
            test('- Name', async () => {
                const incorrectName = getRandomValueFromArray(incorrectNames);
                const password = generateRandomPassword();

                await signUpForm.enterName(incorrectName);
                await signUpForm.enterLastName(testUser1.lastName);
                await signUpForm.enterEmail(generateRandomEmail());
                await signUpForm.enterPassword(password);
                await signUpForm.reEnterPassword(password);

                await expect(signUpForm.registrationButton).toBeDisabled();
                await expect(signUpForm.invalidNameMessage).toBeVisible();
                await expect(signUpForm.invalidNameMessage).toHaveCSS(
                    'color',
                    errorMessageColor.incorrect,
                );
            });

            test('- Last name', async () => {
                const incorrectLastName =
                    getRandomValueFromArray(incorrectNames);
                const password = generateRandomPassword();

                await signUpForm.enterName(testUser1.name);
                await signUpForm.enterLastName(incorrectLastName);
                await signUpForm.enterEmail(generateRandomEmail());
                await signUpForm.enterPassword(password);
                await signUpForm.reEnterPassword(password);

                await expect(signUpForm.registrationButton).toBeDisabled();
                await expect(signUpForm.invalidLastNameMessage).toBeVisible();
                await expect(signUpForm.invalidLastNameMessage).toHaveCSS(
                    'color',
                    errorMessageColor.incorrect,
                );
            });

            test('- Email', async () => {
                const incorrectEmail = getRandomValueFromArray(incorrectEmails);
                const password = generateRandomPassword();

                await signUpForm.enterName(testUser1.name);
                await signUpForm.enterLastName(testUser1.lastName);
                await signUpForm.enterEmail(incorrectEmail);
                await signUpForm.enterPassword(password);
                await signUpForm.reEnterPassword(password);

                await expect(signUpForm.registrationButton).toBeDisabled();
                await expect(signUpForm.incorrectEmailMessage).toBeVisible();
                await expect(signUpForm.incorrectEmailMessage).toHaveCSS(
                    'color',
                    errorMessageColor.incorrect,
                );
            });

            test('- Password', async () => {
                const incorrectPassword =
                    getRandomValueFromArray(incorrectPasswords);

                await signUpForm.enterName(testUser1.name);
                await signUpForm.enterLastName(testUser1.lastName);
                await signUpForm.enterEmail(generateRandomEmail());
                await signUpForm.enterPassword(incorrectPassword);
                await signUpForm.reEnterPassword(incorrectPassword);

                await expect(signUpForm.registrationButton).toBeDisabled();
                await expect(signUpForm.incorrectPasswordMessage).toBeVisible();
                await expect(signUpForm.incorrectPasswordMessage).toHaveCSS(
                    'color',
                    errorMessageColor.incorrect,
                );
            });

            test('- Re-enter password', async () => {
                test.fail(
                    true,
                    'Known defect: the Re-enter password message return "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" instead of "Passwords do not match"',
                );
                const correctPassword = generateRandomPassword();
                const incorrectPassword =
                    getRandomValueFromArray(incorrectPasswords);

                await signUpForm.enterName(testUser1.name);
                await signUpForm.enterLastName(testUser1.lastName);
                await signUpForm.enterEmail(generateRandomEmail());
                await signUpForm.enterPassword(correctPassword);
                await signUpForm.reEnterPassword(incorrectPassword);
                await signUpForm.triggerErrorOnField('reEnterPassword');

                await expect(signUpForm.registrationButton).toBeDisabled();
                await expect(
                    signUpForm.wrongReEnteredPasswordMessage,
                ).toBeVisible();
                await expect(
                    signUpForm.wrongReEnteredPasswordMessage,
                ).toHaveCSS('color', errorMessageColor.incorrect);
            });
        });

        test('Sign up with wrong re-entered password', async () => {
            const password = generateRandomPassword();
            await signUpForm.enterName(testUser1.name);
            await signUpForm.enterLastName(testUser1.lastName);
            await signUpForm.enterEmail(generateRandomEmail());
            await signUpForm.enterPassword(password);
            await signUpForm.reEnterPassword(password.slice(0, 13));
            await signUpForm.triggerErrorOnField('reEnterPassword');

            await expect(signUpForm.registrationButton).toBeDisabled();
            await expect(
                signUpForm.wrongReEnteredPasswordMessage,
            ).toBeVisible();
            await expect(signUpForm.wrongReEnteredPasswordMessage).toHaveCSS(
                'color',
                errorMessageColor.incorrect,
            );
        });
    });
});
