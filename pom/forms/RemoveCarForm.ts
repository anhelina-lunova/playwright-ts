import { Locator, expect } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class RemoveCarForm extends BaseForm {
    private readonly removeCarHeader: Locator = this.page.getByRole('heading', {
        name: 'Remove car',
    });
    private readonly removeCarButton: Locator = this.page.getByRole('button', {
        name: 'Remove',
    });

    async confirmCarRemoval() {
        await expect(this.removeCarHeader).toBeVisible();
        await this.removeCarButton.click();
    }
}
