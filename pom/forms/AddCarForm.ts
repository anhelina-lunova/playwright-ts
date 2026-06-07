import { Locator, expect } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class AddCarForm extends BaseForm {
    public readonly addCarHeader: Locator = this.page.locator('.modal-title');
    private readonly brandDropdown: Locator = this.page.getByLabel('Brand');
    private readonly modelDropdown: Locator = this.page.getByLabel('Model');
    private readonly mileageField: Locator = this.page.getByLabel('Mileage');
    public readonly addButton: Locator = this.page.getByRole('button', {
        name: /^Add$/i, // or exact:true
    });
    private readonly cancelButton: Locator = this.page.getByRole('button', {
        name: /^Cancel$/i,
    });
    private readonly closeFormIcon: Locator = this.page.locator('.close');

    public readonly mileageRequiredMessage: Locator = this.page.getByText(
        'Mileage cost required',
        { exact: true },
    );

    async selectBrand(brandName: string) {
        await this.brandDropdown.selectOption(brandName);
    }

    async selectModel(modelName: string) {
        await this.modelDropdown.selectOption(modelName);
    }

    async enterMileage(amount: number) {
        await this.mileageField.fill(amount.toString());
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async fillInFormAndAddCar(
        brandName: string,
        modelName: string,
        amount: number,
    ) {
        await this.selectBrand(brandName);
        await this.selectModel(modelName);
        await this.enterMileage(amount);
        await this.clickAddButton();
    }

    async cancelAdding() {
        await this.cancelButton.click();
    }

    async closeAddCarForm() {
        await this.closeFormIcon.click();
    }

    async triggerMileageErrorMessage() {
        await this.mileageField.focus();
        await this.mileageField.blur();
    }
}
