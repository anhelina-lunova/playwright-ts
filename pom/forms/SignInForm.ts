import { Locator, Page } from '@playwright/test';

export class SignInForm {
    private readonly page: Page;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly rememberMeCheckbox: Locator;
    private readonly forgotPasswordButton: Locator;
    private readonly registrationButton: Locator;
    private readonly loginButton: Locator;
    public readonly emptyEmailMessage: Locator;
    public readonly emptyPasswordMessage: Locator;
    public readonly incorrectEmailMessage: Locator;
    public readonly wrongCredentialsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByLabel('Email');
        this.passwordField = page.getByLabel('Password');
        this.rememberMeCheckbox = page.getByRole('checkbox', {
            name: 'Remember me',
        });
        this.forgotPasswordButton = page.getByRole('button', {
            name: 'Forgot password',
        });
        this.registrationButton = page.getByRole('button', {
            name: 'Registration',
        });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.emptyEmailMessage = page.getByText('Email required');
        this.emptyPasswordMessage = page.getByText('Password required');
        this.incorrectEmailMessage = page.getByText('Email is incorrect');
        this.wrongCredentialsMessage = page.getByText(
            'Wrong email or password',
        );
    }

    async enterEmail(email: string) {
        await this.emailField.focus();
        await this.emailField.fill(email);
        await this.emailField.blur();
    }

    async enterPassword(password: string) {
        await this.passwordField.focus();
        await this.passwordField.fill(password);
        await this.passwordField.blur();
    }

    async checkRememberMe() {
        await this.rememberMeCheckbox.check();
    }

    async clickForgotPasswordButton() {
        await this.forgotPasswordButton.click();
    }

    async openRegistrationForm() {
        await this.registrationButton.click();
    }

    async login() {
        await this.loginButton.click();
    }

    async signInWithCredentials(email: string, password: string) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.login();
    }

    async triggerErrorOnField(fieldName: string) {
        let field: Locator;

        if (fieldName === 'email') {
            field = this.emailField;
        } else if (fieldName === 'password') {
            field = this.passwordField;
        } else {
            throw new Error('Wrong field name');
        }

        await field.focus();
        await field.blur();
    }
}
