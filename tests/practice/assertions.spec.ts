import test, { expect } from '@playwright/test';

test.describe('Auto-retrying Assertions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('toBeVisible', async ({ page }) => {
        await page.locator('.header_signin').click();
        await expect(page.locator('h4.modal-title')).toBeVisible();
        await page.locator('.close').click();
        await expect(page.locator('#signinEmail')).not.toBeVisible();
    });

    test('toHaveText', async ({ page }) => {
        await page.locator('.header_signin').click();
        await expect(page.locator('.modal-title')).toHaveText('Log in');
    });

    test('toContainText', async ({ page }) => {
        await page.locator('.header_signin').click();
        await expect(page.locator('.modal-title')).toContainText('Log');
    });

    test('toHaveValue', async ({ page }) => {
        await page.locator('.header_signin').click();
        await page.locator('#signinEmail').fill('testemail@gmail.com');
        await expect(page.locator('#signinEmail')).toHaveValue(
            'testemail@gmail.com',
        );
    });

    test('toHaveCSS', async ({ page }) => {
        await expect(page.locator('.hero-descriptor_btn')).toHaveCSS(
            'background-color',
            'rgb(2, 117, 216)',
        );
    });

    test('toBeChecked', async ({ page }) => {
        await page.goto(
            'https://www.tutorialspoint.com/selenium/practice/check-box.php',
        );
        await page.locator('#c_bs_1').check();
        await expect(page.locator('#c_bs_1')).toBeChecked();
        await page.locator('#c_bs_1').uncheck();
        await expect(page.locator('#c_bs_1')).not.toBeChecked();
    });

    test('toHaveCount', async ({ page }) => {
        await expect(page.locator('.socials_icon')).toHaveCount(5);
    });

    test('toHaveURL', async ({ page }) => {
        await expect(page).toHaveURL('https://qauto.forstudy.space/');
    });
});

test.describe('Non-retrying Assertions', () => {
    test('toBe', () => {
        const result = 10 + 12;
        expect(result).toBe(20);
    });

    test('toHaveLength', () => {
        const array = [10, 20, 30, 40];

        expect(array).toHaveLength(4);
    });

    test('toContain', () => {
        const string = 'Test string';

        expect(string).not.toContain('Test');
    });
});
