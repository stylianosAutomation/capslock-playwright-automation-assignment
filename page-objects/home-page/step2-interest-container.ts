import { expect,  Page,  Locator } from "@playwright/test";

// Page object for Step 2: Interest selection
export class Step2InterestContainer {
    readonly page: Page; // Playwright page instance
    readonly parentContainer: Locator; // Main form container
    readonly nextButton: Locator; // Button to proceed to next step

    constructor(page: Page) {
        this.page = page;
        this.parentContainer = page.locator('#form-container-1');
        this.nextButton = this.parentContainer.locator('[data-tracking="btn-step-2"]')
    }
    // Select an interest option by visible text
    async selectInterestOption(option:string) {
        await expect(this.parentContainer).toBeVisible()
        await this.parentContainer.getByText(option).click()
    }
    // Click the next button to submit the step
    async submit() {
        await expect(this.parentContainer).toBeVisible()
        await expect(this.nextButton).toBeVisible();
        await expect(this.nextButton).toBeEnabled();
        await this.nextButton.click();
    }
}
