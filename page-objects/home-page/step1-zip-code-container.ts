import { expect,  Page,  Locator } from "@playwright/test";
import {FieldErrorMessages, ZipErrorKey} from "../../support-commands/types/error-messages"
import { validateFieldError } from "../../support-commands/helpers/error-validation-helper";

export class ZipCodeContainer {
    readonly page: Page;
    readonly parentComponent: Locator;
    readonly zipInput: Locator;
    readonly nextButton: Locator;
    readonly zipError : Locator;

    constructor(page: Page) {
        this.page = page;
        //step One Component 
        this.parentComponent = page.locator('#form-container-1');
        // Get Zip Code Field
        this.zipInput = this.parentComponent.getByRole('textbox', { name: 'Enter ZIP Code' });
        //get nextButton
        this.nextButton = this.parentComponent.getByRole('button', { name: 'Next' });
        this.zipError =  this.parentComponent.locator('.inputBlock:has(input[data-zip-code-input][name="zipCode"]) .helpBlock')
    }

    async fillZip(zip: string) {
        await expect(this.parentComponent).toBeVisible()
        await expect(this.zipInput).toBeVisible()
        await this.zipInput.fill(zip)
        await expect(this.zipInput).toHaveValue(zip);
    }

    async validateZipCodeError(type:ZipErrorKey) {
       await validateFieldError(this.zipError, FieldErrorMessages.zip[type],`name:${type}`) }
       
    async submit() {
        await expect(this.parentComponent).toBeVisible()
        await  expect(this.nextButton).toBeVisible();
        await  expect(this.nextButton).toBeEnabled();
        await this.nextButton.click();
        await this.zipInput.blur();
    }
}
