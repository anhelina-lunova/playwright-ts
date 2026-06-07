import { Locator } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class SignUpForm extends BaseForm {
    private readonly nameField: Locator = this.page.locator('#signupName');
    private readonly lastNameField: Locator =
        this.page.locator('#signupLastName');
    private readonly emailField: Locator = this.page.getByLabel('Email');
    private readonly passwordField: Locator = this.page
        .getByLabel('Password')
        .first();
    private readonly reEnterPasswordField: Locator =
        this.page.getByLabel('Re-enter password');
    public readonly registrationButton: Locator = this.page.getByRole(
        'button',
        { name: 'Register' },
    );
    public readonly emptyNameMessage: Locator = this.page.getByText(
        'Name required',
        { exact: true },
    );
    public readonly invalidNameMessage: Locator =
        this.page.getByText('Name is invalid');
    public readonly emptyLastNameMessage: Locator = this.page.getByText(
        'Last name required',
        { exact: true },
    );
    public readonly invalidLastNameMessage: Locator = this.page.getByText(
        'Last name is invalid',
    );
    public readonly emptyEmailMessage: Locator =
        this.page.getByText('Email required');
    public readonly incorrectEmailMessage: Locator =
        this.page.getByText('Email is incorrect');
    public readonly emptyPasswordMessage: Locator = this.page.getByText(
        'Password required',
        { exact: true },
    );
    public readonly incorrectPasswordMessage: Locator = this.page.getByText(
        'from 8 to 15 characters long and contain at least one integer',
    );
    public readonly emptyReEnterPasswordMessage: Locator = this.page.getByText(
        'Re-enter password required',
    );
    public readonly userAlreadyExistMessage: Locator = this.page.getByText(
        'User already exists',
    );
    public readonly wrongReEnteredPasswordMessage: Locator =
        this.page.getByText('Passwords do not match');

    async enterName(name: string) {
        await this.nameField.fill(name);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async reEnterPassword(password: string) {
        await this.reEnterPasswordField.fill(password);
    }

    async register() {
        await this.registrationButton.click();
    }

    async fillInAndRegister(
        name: string,
        lastName: string,
        email: string,
        password: string,
        rePassword: string,
    ) {
        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.reEnterPassword(rePassword);
        await this.registrationButton.click();
    }

    async triggerErrorOnField(fieldName: string) {
        let field: Locator;

        switch (fieldName) {
            case 'name':
                field = this.nameField;
                break;

            case 'lastName':
                field = this.lastNameField;
                break;

            case 'email':
                field = this.emailField;
                break;

            case 'password':
                field = this.passwordField;
                break;

            case 'reEnterPassword':
                field = this.reEnterPasswordField;
                break;

            default:
                throw new Error('Wrong field name');
                break;
        }

        await field.focus();
        await field.blur();
    }
}
