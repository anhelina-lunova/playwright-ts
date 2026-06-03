import { Locator, Page } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    private readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
    }

    async openSite() {
        await this.page.goto('/');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }
}
