import { type Page } from "@playwright/test";
import { ZipCodeContainer } from "../../page-objects/home-page/step1-zip-code-container"
import { testData } from "../utils/test-data"
import { DataMode } from "../types/test-data-mode";


// Helper function to automate zip code input and validation for different test scenarios
export const zipCodeHelper = async (page: Page, mode: DataMode) => {
  // Instantiate the page object for the zip code step
  const step1 = new ZipCodeContainer(page)

  switch (mode) {
    case ("invalid"):
      // Fill with invalid zip code, submit, and validate error message
      await step1.fillZip(testData.invalid.zipShort)
      console.log(testData.invalid.zipShort)
      await step1.submit()
      await step1.validateZipCodeError("invalid")
      break;

    case ("empty"):
      // Submit without entering zip code and validate required error
      await step1.submit()
      await step1.validateZipCodeError("required")
      break;

    default:
      // Fill with valid zip code and submit
      await step1.fillZip(testData.valid.zipCode)
      await step1.submit()
      console.log(`Zip Code set"${testData.valid.zipCode}"`)
      break;
  }
}
