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
    const button = page.getByRole('button');
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
