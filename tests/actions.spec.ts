import { test, expect } from '@playwright/test';

test.describe('Actions with elements', () => {
    test.describe('- hillel site', () => {
        test.beforeEach('site access', async ({ page }) => {
            await page.goto('');
        });

        test('click', async ({ page }) => {
            await page
                .getByText('Sign In')
                .click({ force: true, button: 'right' });
            await page.getByText('Sign In').dblclick();
        });

        test('text', async ({ page }) => {
            await page.getByText('Sign In').click();
            await page.getByLabel('Email').fill('test@mail.com');
            await page
                .getByLabel('Password')
                .pressSequentially('testpass', { delay: 300 });
        });

        test('press', async ({ page }) => {
            await page.getByText('Sign In').click();
            await page.getByLabel('Email').fill('test@mail.com');
            await page.getByLabel('Email').press('Tab');
        });

        test('focus, blur', async ({ page }) => {
            await page.getByText('Sign up').click();
            await page.locator('#signupLastName').focus();
            await page.locator('#signupLastName').blur();
        });

        test('scrollInto', async ({ page }) => {
            await page.locator('.contacts_socials').scrollIntoViewIfNeeded();
        });

        test('dropdowns', async ({ page }) => {
            await page.getByRole('button', { name: 'Sign in' }).click();
            await page.getByLabel('Email').fill(process.env.USER_EMAIL || '');
            await page
                .getByLabel('Password')
                .fill(process.env.USER_PASSWORD || '');
            await page.getByRole('button', { name: 'Login' }).click();

            await page.getByRole('button', { name: 'Add car' }).click();
            await page.getByLabel('Brand').selectOption('BMW');
            await page.getByLabel('Model').selectOption({ label: 'X6' });
        });
    });

    test('check, uncheck, isChecked', async ({ page }) => {
        await page.goto(
            'https://www.tutorialspoint.com/selenium/practice/check-box.php',
        );

        const firstCheckBox = await page.locator('#c_bs_1');
        const secondCheckBox = await page.locator('#c_bs_2');

        console.log(await firstCheckBox.isChecked());
        await firstCheckBox.check();
        console.log(await firstCheckBox.isChecked());
        await firstCheckBox.uncheck();
        console.log(await firstCheckBox.isChecked());
        await secondCheckBox.check();
        console.log(await secondCheckBox.isChecked());
    });
});
