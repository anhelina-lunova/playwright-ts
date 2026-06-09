import { test, expect } from '@playwright/test';

test.beforeEach('site access', async ({ page }) => {
    await page.goto('');
});

test('page.locator - xPath', async ({ page }) => {
    const title = page.locator('//h1');
    const allButtonsXpath = page.locator('xpath=//button');
});

test('page.locator - CSS', async ({ page }) => {
    const titleCSS = page.locator('css=h1');
    const allButtons = page.locator('button');

    const button = page.locator('.btn-primary');
    await button.click();
});

test('getByRole', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Sign In' });
    await button.click();
});

test('getByText', async ({ page }) => {
    page.getByText('Do more!');
});

test('getByPlaceholder', async ({ page }) => {
    page.getByPlaceholder('');
});

test('getByAltText', async ({ page }) => {
    page.getByAltText('Instructions');
});

// text field
test('getByLabel', async ({ page }) => {
    const button = page.locator('.btn-primary');
    await button.click();
    page.getByLabel('Email');
});

test('getByTitle', async ({ page }) => {
    page.getByTitle('');
});

test('getByTestId', async ({ page }) => {
    page.getByTestId('');
});

//

test('HW1 - T1 - page.locator - CSS', async ({ page }) => {
    const button = page.locator('.header_signin');
    await button.highlight();
});

test('HW1 - T1 - page.locator - xPath', async ({ page }) => {
    const button = page.locator('//button[contains(@class, "header_signin")]');
    await button.highlight();
});

test('HW1 - T1 - getByRole', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Sign In' });
    await button.highlight();
});

test('HW1 - T2 - Header elements', async ({ page }) => {
    const header = page.locator('header');

    const home = header.getByText('Home');
    await home.highlight();

    const about = header.getByText('About');
    await about.highlight();

    const contacts = header.getByText('Contacts');
    await contacts.highlight();
});
