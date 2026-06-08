import { test as base, Page } from '@playwright/test';

type ScreenSizes = {
    smallScreen: Page;
    mediumScreen: Page;
    largeScreen: Page;
};

export const test = base.extend<ScreenSizes>({
    smallScreen: async ({ page }, use) => {
        await page.setViewportSize({ width: 300, height: 300 });
        await use(page);
        console.log('Test with small screen is finished!');
    },
    mediumScreen: async ({ page }, use) => {
        await page.setViewportSize({ width: 600, height: 600 });
        await use(page);
        console.log('Test with medium screen is finished!');
    },
    largeScreen: async ({ page }, use) => {
        await page.setViewportSize({ width: 1000, height: 1000 });
        await use(page);
        console.log('Test with large screen is finished!');
    },
});

export { expect } from '@playwright/test';
