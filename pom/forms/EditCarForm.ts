import { Locator, expect } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class EditCarForm extends BaseForm {
    private readonly editCarHeader: Locator = this.page.locator('.modal-title');
    private readonly removeCarButton: Locator = this.page.getByRole('button', {
        name: 'Remove car',
    });

    async removeCar() {
        await expect(this.editCarHeader).toBeVisible();
        await this.removeCarButton.click();
    }
}
