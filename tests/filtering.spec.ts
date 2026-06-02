import { test, expect } from '@playwright/test';

test.beforeEach('site access', async ({ page }) => {
    await page.goto('');
});

test('.filter hasText', async ({ page }) => {
    page.locator('//button').filter({ hasText: 'Sign' });
    page.getByRole('button').filter({ hasText: 'Sign' });

    page.locator('//button', { hasText: 'Sign In' });
    page.getByRole('button', { name: 'Sign In' });
});

test('.filter hasNotText', async ({ page }) => {
    page.locator('//button').filter({ hasNotText: 'Sign' });
    page.getByRole('button').filter({ hasNotText: 'Sign' });
});

test('.filter has', async ({ page }) => {
    const tgIcon = page
        .locator('//a')
        .filter({ has: page.locator('span.icon-telegram') });
    await tgIcon.highlight();
});

test('.filter hasNot', async ({ page }) => {
    const tgIcon = page
        .locator('//a')
        .filter({ hasNot: page.locator('span.icon-telegram') });
    await tgIcon.highlight();
});
