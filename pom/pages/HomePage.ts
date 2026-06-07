import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private readonly signInButton: Locator = this.page.getByRole('button', {
        name: 'Sign in',
    });
    private readonly signUpButton: Locator = this.page.getByRole('button', {
        name: 'Sign up',
    });

    async navigate() {
        await super.navigate('/');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }

    async openSignUpForm() {
        await this.signUpButton.click();
    }
}
