import { test, expect } from '@playwright/test';

test.beforeEach('site access', async ({ page }) => {
    await page.goto('');
});

test('count', async ({ page }) => {
    const elements = page.locator('.socials_icon');
    const countEls = await elements.count();
    console.log(countEls);
});

test('first', async ({ page }) => {
    const elements = page.locator('.socials_icon');
    await elements.first().highlight();
});

test('last', async ({ page }) => {
    const elements = page.locator('.socials_icon');
    await elements.last().highlight();
});

test('ntx - index', async ({ page }) => {
    const elements = page.locator('.socials_icon');
    await elements.nth(3).highlight();
});

test('all', async ({ page }) => {
    const elements = page.locator('a');
    for (const item of await elements.all()) {
        const text = await item.textContent();
        console.log(text);
    }
});
