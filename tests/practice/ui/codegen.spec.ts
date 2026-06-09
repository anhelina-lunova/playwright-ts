import { test, expect } from '@playwright/test';

test.describe('CodeGen Sign In Tests', () => {
    const userEmail = process.env.USER_EMAIL;
    const userPassword = process.env.USER_PASSWORD;

    test.beforeEach('Open site and Sign In form', async ({ page }) => {
        await page.goto('');
        await page.getByRole('button', { name: 'Sign In' }).click();
    });

    test('Successful sign in with valid credentials', async ({ page }) => {
        await page
            .getByRole('textbox', { name: 'Email' })
            .fill(userEmail || '');
        await page
            .getByRole('textbox', { name: 'Password' })
            .fill(userPassword || '');
        // await page.getByRole('checkbox', { name: 'Remember me' }).check();
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(
            page.getByRole('heading', { name: 'Garage' }),
        ).toBeVisible();
        await expect(page.getByRole('heading')).toContainText('Garage');
    });

    test('Sign in with empty email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).focus();
        await page.getByRole('textbox', { name: 'Email' }).blur();
        await page.getByRole('textbox', { name: 'Password' }).fill('password');
        await expect(page.getByRole('paragraph')).toContainText(
            'Email required',
        );
        await expect(page.getByRole('paragraph')).toHaveCSS(
            'color',
            'rgb(220, 53, 69)',
        );
    });

    test('Sign in with empty password', async ({ page }) => {
        await page
            .getByRole('textbox', { name: 'Email' })
            .fill('email@yopmail.com');
        await page.getByRole('textbox', { name: 'Password' }).focus();
        await page.getByRole('textbox', { name: 'Password' }).blur();
        await expect(page.getByText('Password required')).toBeVisible();
        await expect(page.getByText('Password required')).toHaveCSS(
            'color',
            'rgb(220, 53, 69)',
        );
    });

    test('Sign in with incorrect email', async ({ page }) => {
        await page
            .getByRole('textbox', { name: 'Email' })
            .fill('emailincorrect');
        await page
            .getByRole('textbox', { name: 'Password' })
            .fill('testpassword');
        await page.getByRole('textbox', { name: 'Password' }).blur();
        // await page.getByRole('checkbox', { name: 'Remember me' }).check();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await expect(page.getByRole('paragraph')).toContainText(
            'Email is incorrect',
        );
        await expect(page.getByRole('paragraph')).toHaveCSS(
            'color',
            'rgb(220, 53, 69)',
        );
    });

    test('Sign in with wrong credentials', async ({ page }) => {
        await page
            .getByRole('textbox', { name: 'Email' })
            .fill('wrong@email.com');
        await page
            .getByRole('textbox', { name: 'Password' })
            .fill('wrongpassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('paragraph')).toContainText(
            'Wrong email or password',
        );
        await expect(page.getByRole('paragraph')).toHaveCSS(
            'color',
            'rgb(114, 28, 36)',
        );
    });
});
