import { Locator, Page } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class SignInForm extends BaseForm {
    private readonly emailField: Locator = this.page.getByLabel('Email');
    private readonly passwordField: Locator = this.page.getByLabel('Password');
    private readonly rememberMeCheckbox: Locator = this.page.getByRole(
        'checkbox',
        {
            name: 'Remember me',
        },
    );
    private readonly forgotPasswordButton: Locator = this.page.getByRole(
        'button',
        {
            name: 'Forgot password',
        },
    );
    private readonly registrationButton: Locator = this.page.getByRole(
        'button',
        {
            name: 'Registration',
        },
    );
    private readonly loginButton: Locator = this.page.getByRole('button', {
        name: 'Login',
    });
    public readonly emptyEmailMessage: Locator =
        this.page.getByText('Email required');
    public readonly emptyPasswordMessage: Locator =
        this.page.getByText('Password required');
    public readonly incorrectEmailMessage: Locator =
        this.page.getByText('Email is incorrect');
    public readonly wrongCredentialsMessage: Locator = this.page.getByText(
        'Wrong email or password',
    );

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
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
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.login();
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
