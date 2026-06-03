import { test, expect } from '@playwright/test';

test.describe('CodeGen Sign Up Tests', () => {
    const name = 'Test';
    const lastName = 'User';
    let correctEmail: string;
    const incorrectEmail = 'incorrect.com';
    const correctPassword = 'One1nteger';
    const incorrectNames = ['абв'];
    const wrongLengthNames = ['z', 'x ', ' y', 'abcdefghijklmnopqrstuvwxyz'];
    const incorrectPasswords = [
        'Один0дин', //
        'Qwertyuiopasdfg',
        'One1nte',
        '4bcdEfghijklmnop',
    ];

    test.beforeEach('Open site and Sign up form', async ({ page }) => {
        correctEmail = `email-test+${Date.now()}@yopmail.com`;
        await page.goto('');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('Successful sign up with valid data', async ({ page }) => {
        await page.locator('#signupName').fill(name);
        await page.locator('#signupLastName').fill(lastName);
        await page
            .getByRole('textbox', { name: 'Name Last name Email' })
            .fill(correctEmail);
        await page
            .getByRole('textbox', { name: 'Password', exact: true })
            .fill(correctPassword);
        await page
            .getByRole('textbox', { name: 'Re-enter password' })
            .fill(correctPassword);
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(
            page.getByRole('heading', { name: 'Garage' }),
        ).toBeVisible();
    });

    test('Not possible to register with already registered email', async ({
        page,
    }) => {
        await page.locator('#signupName').fill(name);
        await page.locator('#signupLastName').fill(lastName);
        await page
            .getByRole('textbox', { name: 'Name Last name Email' })
            .fill(correctEmail);
        await page
            .getByRole('textbox', { name: 'Password', exact: true })
            .fill(correctPassword);
        await page
            .getByRole('textbox', { name: 'Re-enter password' })
            .fill(correctPassword);
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(
            page.getByRole('heading', { name: 'Garage' }),
        ).toBeVisible();

        await page
            .getByRole('button', { name: 'User photo My profile' })
            .click();
        await page.getByRole('button', { name: 'Logout' }).click();

        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.locator('#signupName').fill(name);
        await page.locator('#signupLastName').fill(lastName);
        await page
            .getByRole('textbox', { name: 'Name Last name Email' })
            .fill(correctEmail);
        await page
            .getByRole('textbox', { name: 'Password', exact: true })
            .fill(correctPassword);
        await page
            .getByRole('textbox', { name: 'Re-enter password' })
            .fill(correctPassword);
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('form')).toContainText('User already exists');
    });

    test('Error messages are displayed if no data is filled in', async ({
        page,
    }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').blur();

        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();
        await page
            .getByRole('textbox', { name: 'Name Last name Email' })
            .focus();
        await page
            .getByRole('textbox', { name: 'Name Last name Email' })
            .blur();
        await page
            .getByRole('textbox', { name: 'Password', exact: true })
            .focus();
        await page
            .getByRole('textbox', { name: 'Password', exact: true })
            .blur();
        await page.getByRole('textbox', { name: 'Re-enter password' }).focus();
        await page.getByRole('textbox', { name: 'Re-enter password' }).blur();

        await expect(page.locator('form')).toContainText('Name is required');
        await expect(page.locator('form')).toContainText(
            'Last name is required',
        );
        await expect(page.locator('form')).toContainText('Email required');
        await expect(page.locator('form')).toContainText('Password required');
        await expect(page.locator('form')).toContainText(
            'Re-enter password required',
        );
        await expect(
            page.getByRole('button', { name: 'Register' }),
        ).toBeDisabled();
    });

    test.describe('Error message is displayed if no data is filled in the following field: ', () => {
        test.afterEach(
            'check color and button is disabled',
            async ({ page }) => {
                await expect(page.locator('div.invalid-feedback')).toHaveCSS(
                    'color',
                    'rgb(220, 53, 69)',
                );
                await expect(
                    page.getByRole('button', { name: 'Register' }),
                ).toBeDisabled();
            },
        );

        test('- Name', async ({ page }) => {
            await page.locator('#signupName').focus();
            await page.locator('#signupLastName').fill(lastName);
            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(correctEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(correctPassword);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(correctPassword);
            await expect(page.locator('form')).toContainText('Name required');
        });

        test('- Last Name', async ({ page }) => {
            await page.locator('#signupName').fill(name);
            await page.locator('#signupLastName').focus();

            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(correctEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(correctPassword);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(correctPassword);

            await expect(page.locator('form')).toContainText(
                'Last name required',
            );
        });

        test('- Email', async ({ page }) => {
            await page.locator('#signupName').fill(name);
            await page.locator('#signupLastName').fill(lastName);
            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .focus();
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(correctPassword);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(correctPassword);

            await expect(page.locator('form')).toContainText('Email required');
        });

        test('- Password', async ({ page }) => {
            await page.locator('#signupName').fill(name);
            await page.locator('#signupLastName').fill(lastName);
            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(correctEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .focus();
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(correctPassword);

            await expect(page.locator('form')).toContainText(
                'Password required',
            );
        });

        test('- Re-Password', async ({ page }) => {
            await page.locator('#signupName').fill(name);
            await page.locator('#signupLastName').fill(lastName);
            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(correctEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(correctPassword);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .focus();
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .blur();

            await expect(page.locator('form')).toContainText(
                'Re-enter password required',
            );
        });
    });

    test.describe('Error message is displayed if invalid data is filled in the following field: ', () => {
        test.afterEach(
            'check color and button is disabled',
            async ({ page }) => {
                await expect(page.locator('div.invalid-feedback')).toHaveCSS(
                    'color',
                    'rgb(220, 53, 69)',
                );
                await expect(
                    page.getByRole('button', { name: 'Register' }),
                ).toBeDisabled();
            },
        );

        test('- Name', async ({ page }) => {
            await page.locator('#signupName').fill(incorrectNames[0]);
            await page.locator('#signupLastName').fill(lastName);
            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(correctEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(correctPassword);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(correctPassword);
            await expect(page.locator('div.invalid-feedback')).toContainText(
                'Name is invalid',
            );
        });

        test('- Last Name', async ({ page }) => {
            await page.locator('#signupName').fill(name);
            await page.locator('#signupLastName').fill(incorrectNames[0]);

            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(correctEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(correctPassword);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(correctPassword);

            await expect(page.locator('form')).toContainText(
                'Last name is invalid',
            );
        });

        test('- Email', async ({ page }) => {
            await page.locator('#signupName').fill(name);
            await page.locator('#signupLastName').fill(lastName);

            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(incorrectEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(correctPassword);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(correctPassword);

            await expect(page.locator('form')).toContainText(
                'Email is incorrect',
            );
        });

        test('- Password', async ({ page }) => {
            await page.locator('#signupName').fill(name);
            await page.locator('#signupLastName').fill(lastName);

            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(correctEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(incorrectPasswords[0]);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(incorrectPasswords[0]);

            await expect(page.locator('form')).toContainText(
                'from 8 to 15 characters long and contain at least one integer',
            );
        });

        test('- Re-Password', async ({ page }) => {
            await page.locator('#signupName').fill(name);
            await page.locator('#signupLastName').fill(lastName);
            await page
                .getByRole('textbox', { name: 'Name Last name Email' })
                .fill(correctEmail);
            await page
                .getByRole('textbox', { name: 'Password', exact: true })
                .fill(correctPassword);
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .fill(correctPassword + 'aasd');
            await page
                .getByRole('textbox', { name: 'Re-enter password' })
                .blur();

            await expect(page.locator('form')).toContainText(
                'Passwords do not match',
            );
        });
    });
});
