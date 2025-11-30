import { expect , Page, Locator } from "@playwright/test"

// Page object for Step 6: Thank You page validation
export class ThankYouPage {
    readonly page: Page; // Playwright page instance
    readonly parentContainer: Locator; // Main form container
    readonly urlEndPoint: string; // Expected URL endpoint for thank you page
    readonly pageTitle: string; // Expected page title


    constructor(page: Page) {
        this.page = page;
        this.parentContainer = page.locator('#form-container-1');
        this.urlEndPoint = "/thankyou";
        this.pageTitle = "Thank you!"

    }
    // Validate that the thank you page is loaded
    async thankYouPage() {
        await this.page.waitForURL(new RegExp(`${this.urlEndPoint}$`)); // Wait for the URL to match
        await expect(this.page).toHaveURL(new RegExp(`${this.urlEndPoint}$`)); // Check URL
        await expect(this.page).toHaveTitle(new RegExp(`${this.pageTitle}$`)); // Check page title
       console.log("Current URL:", this.page.url());
       console.log("Page Title:", await this.page.title());
    }
}


