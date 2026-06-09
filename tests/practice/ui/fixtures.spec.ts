import { chromium } from '@playwright/test';
import { test, expect } from '../../../utils/fixtures/screenSizesFixture';

test.describe('Fixtures', () => {
    test('Open wikipedia without fixtures', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://wikipedia.org');
    });

    test('Open wikipedia with small screen fixture', async ({
        smallScreen,
    }) => {
        await smallScreen.goto('https://wikipedia.org');
    });

    test('Open wikipedia with medium screen fixture', async ({
        mediumScreen,
    }) => {
        await mediumScreen.goto('https://wikipedia.org');
    });

    test('Open wikipedia with large screen fixture', async ({
        largeScreen,
    }) => {
        await largeScreen.goto('https://wikipedia.org');
    });
});
