import { Page } from "@playwright/test";
import { testData } from "../utils/test-data"
import { Step5PhoneContainer } from "../../page-objects/home-page/step5-phone-number-containers"
import { DataMode } from "../types/test-data-mode";

// Helper to automate phone number input and validation for different scenarios
export const phoneDataHelper = async (page: Page, mode: DataMode) => {
    // Instantiate the page object for phone number step
    const step5 = new Step5PhoneContainer(page)
    switch (mode) {
        case "empty":
            // Test with empty phone number
            await step5.fillPhoneNumber("")
            await step5.submit()
            await step5.validateFullNameError("required")
            break;
        case "invalid":
            // Test with invalid phone number
            await step5.fillPhoneNumber(testData.invalid.phoneShort)
            await step5.submit()
            await step5.validateFullNameError("invalid")
            break;
        default:
            // Test with valid phone number
            await step5.fillPhoneNumber(testData.valid.phone)
            console.log(`User phone number :  ${testData.valid.phone}`)
            await step5.submit()
            break;
    }
}