import { expect, Page, Locator } from "@playwright/test"
import { EmailErrorKey, FieldErrorMessages, NameErrorKey } from "../../support-commands/types/error-messages"
import { validateFieldError } from "../../support-commands/helpers/error-validation-helper";

// Page object for Step 4: Personal details (full name & email)
export class Step4PersonalContainer {
    readonly page: Page; // Playwright page instance
    readonly parentContainer: Locator; // Main form container
    readonly fullNameInput: Locator; // Input for full name
    readonly emailInput: Locator; // Input for email
    readonly fullnameError: Locator; // Error message for full name
    readonly headerValidation: Locator; // Header text for validation
    readonly estimateButton: Locator; // Button to submit this step


    constructor(page: Page) {
        this.page = page;
        this.parentContainer = page.locator('#form-container-1');
        this.fullNameInput = this.parentContainer.locator('[data-name-input]');
        this.emailInput = this.parentContainer.getByRole('textbox', { name: 'Enter Your Email' });
        this.fullnameError = this.parentContainer.locator('.inputBlock:has(input[data-name-input][name="name"]) .helpBlock')
        this.headerValidation = this.parentContainer.getByText('Who should we prepare this')
        this.estimateButton = this.parentContainer.locator('[data-tracking="btn-step-4"]');
    }
    // Fill in personal details (full name and email)
    async fillPersonalDetails(fullname: string, email: string) {

        await expect(this.parentContainer).toBeVisible()
        await this.fullNameInput.fill(fullname)
        await expect(this.fullNameInput).toHaveValue(fullname)
        await this.emailInput.fill(email)
        await expect(this.emailInput).toHaveValue(email)
    }
    // Validate full name error message
    async validateFullNameError(type: NameErrorKey) {
        await validateFieldError(this.fullnameError, FieldErrorMessages.name[type], `name:${type}`)
    }
    // Validate email error using native browser validation message
    async validateEmailError(input: Locator, type: EmailErrorKey) {
        const msg = await input.evaluate((el: HTMLInputElement) => el.validationMessage);
        const expectedText = FieldErrorMessages.email[type];
        expect(msg).toBe(expectedText);
        console.log(`Native validation OK: "${msg}"`);
    }
    // Submit the form for this step
    async submit() {
        await expect(this.parentContainer).toBeVisible()
        await expect(this.estimateButton).toBeVisible();
        await expect(this.estimateButton).toBeEnabled();
        await expect(this.headerValidation).toHaveText(/who should we prepare/i)
        await this.estimateButton.click();
        await this.fullNameInput.blur();
    }

}
