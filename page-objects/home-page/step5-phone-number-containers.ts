import { expect, Page, Locator } from "@playwright/test"
import {formatMaskedPhone} from "../../support-commands/utils/test-data"
import { validateFieldError } from "../../support-commands/helpers/error-validation-helper";
import { FieldErrorMessages, PhoneErrorKey } from "../../support-commands/types/error-messages";

// Page object for Step 5: Phone number input and validation
export class Step5PhoneContainer {
    readonly page: Page; // Playwright page instance
    readonly parentContainer: Locator; // Main form container
    readonly phoneNumberInput: Locator; // Input for phone number
    readonly lastStep: Locator; // Text indicating last step
    readonly phoneError: Locator; // Error message for phone number
    readonly submitButton: Locator; // Button to submit the form


    constructor(page: Page) {
        this.page = page;
        this.parentContainer = page.locator('#form-container-1');
        this.phoneNumberInput = this.parentContainer.getByRole('textbox', { name: '(XXX)XXX-XXXX' });
        this.lastStep = this.parentContainer.getByText('LAST STEP!');
        this.phoneError = this.parentContainer.locator('.inputBlock:has(input[data-phone-input][name="phone"]) .helpBlock');
        this.submitButton = this.parentContainer.getByRole('button', { name: 'Submit Your Request' });
    }
    // Fill in the phone number field
    async fillPhoneNumber(phonenumber: string) {
       console.log(`phoneNumbe data will be ${phonenumber}`)
        await expect(this.parentContainer).toBeVisible();
        await expect(this.lastStep).toHaveText(/last step/i);
        await this.phoneNumberInput.fill(phonenumber);
    }
    
    // Validate phone number error message
    async validateFullNameError(type: PhoneErrorKey) {
         await   validateFieldError(this.phoneError,FieldErrorMessages.phone[type],`name:${type}`);
        }

    // Submit the phone number form
    async submit() {
        await this.phoneNumberInput.blur()
        await expect(this.parentContainer).toBeVisible();
        await expect(this.submitButton).toBeVisible();
        await expect(this.submitButton).toBeEnabled();
        await this.submitButton.click();
    }
}