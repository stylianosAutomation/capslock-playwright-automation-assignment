import { expect, Page, Locator } from "@playwright/test";
import { FieldErrorMessages, VariantsErrorKey } from "../../support-commands/types/error-messages"
import { validateFieldError } from "../../support-commands/helpers/error-validation-helper";

// Page object for Step 3: Property selection
export class Step3PropertyContainer {
    readonly page: Page; // Playwright page instance
    readonly parentContainer: Locator; // Main form container
    readonly variantsError: Locator; // Error message for variants
    readonly nextButton: Locator; // Button to proceed to next step

    constructor(page: Page) {
        this.page = page;
        this.parentContainer = page.locator('#form-container-1');
        this.variantsError = this.parentContainer.locator('[data-error-block]:has-text("Choose one of the variants.")');
        this.nextButton = this.parentContainer.locator('[data-tracking="btn-step-3"]');
    }
    // Select a property option by visible text
    async selectPropertyOption(option: string) {
        await expect(this.parentContainer).toBeVisible()
        await this.parentContainer.getByText(option).click()
    }
    // Validate the variants error message
    async validateVariantsError(type: VariantsErrorKey) {
       await validateFieldError(this.variantsError, FieldErrorMessages.variants[type],`name:${type}`)
    }
    // Click the next button to submit the step
    async submit() {
        await expect(this.parentContainer).toBeVisible()
        await expect(this.nextButton).toBeVisible();
        await expect(this.nextButton).toBeEnabled();
        await this.nextButton.click();
    }
}
