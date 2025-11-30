import { Page } from "@playwright/test";
import { testData } from "../utils/test-data"
import { Step4PersonalContainer } from "../../page-objects/home-page/step4-user-data-container"
import { DataMode } from "../types/test-data-mode";

// Helper to automate personal data input and validation for different scenarios
export const personalDataHelper = async (page: Page, mode: DataMode) => {
    // Instantiate the page object for personal data step
    const step4 = new Step4PersonalContainer(page)
    switch (mode) {
        case "empty":
            // Test with both fields empty, then only name empty
            await step4.fillPersonalDetails("","")
            await step4.submit()
            await step4.validateEmailError(step4.emailInput,"required") 
            await step4.fillPersonalDetails("", testData.valid.email)  
            await step4.submit()
            await step4.validateFullNameError("empty")
            break;

        case "invalid":
            // Test with invalid full name, then invalid email
            await step4.fillPersonalDetails(testData.invalid.fullNameDigits,testData.valid.email)
            await step4.submit()
            await step4.validateFullNameError("invalid")
            await step4.fillPersonalDetails("",testData.invalid.emailWrong)
            await step4.submit()
            await step4.validateEmailError(step4.emailInput,"invalid")
            break;

        case "onlyFirstName":
            // Test with only first name provided
            await step4.fillPersonalDetails(testData.invalid.onlyFirstName,testData.valid.email)
            await step4.submit()
            await step4.validateFullNameError("onlyFirstName")
            break;

        default:
            // Test with valid full name and email
            await step4.fillPersonalDetails(
                testData.valid.fullName,
                testData.valid.email
            )
            console.log(`Personal Data set with ${testData.valid.fullName} & ${testData.valid.email} `)
            await step4.submit()
            break;
    }
}
