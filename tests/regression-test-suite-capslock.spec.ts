// Import Playwright test runner
import { test } from '@playwright/test';
// Import utility to visit URLs
import { visitUrl } from "../support-commands/utils/reusable-url";
// Import custom hook for environment and brand selection
import { useBrandEnv } from '../support-commands/hooks/environment-url'

import { interestOptionsHelper } from '../support-commands/helpers/interest-options-helper';
import { propertyOptionsHelper } from '../support-commands/helpers/property-options-helper';
import { zipCodeHelper } from '../support-commands/helpers/zip-code-helper'
import { personalDataHelper } from '../support-commands/helpers/personal-data-helpers'
import { phoneDataHelper } from '../support-commands/helpers/phone-data-helpers'


// Get the correct test URL for the selected environment and brand
const { currentUrl } = useBrandEnv("test", "capslock");

// Main test suite for field validations
// Each 'describe' block groups related tests

test.describe("CapsLock - Field Validations (Regression)", () => {

    // Runs before each test in this suite
    test.beforeEach(async ({ page }) => {
        // Check if the test URL exists, then visit it
        if (!currentUrl) {
            throw new Error('Demo URL not found in brands array');
        }
        await visitUrl(page, currentUrl)
    })

    // Zip code validation tests
    test.describe('Zip code validation (Regression)', () => {
        test('should_show_required_error_when_zip_is_empty', async ({ page }) => {
            // Test submitting empty zip code
            await zipCodeHelper(page, "empty");
        });

        test('should_show_invalid_error_when_zip_is_too_short', async ({ page }) => {
            // Test submitting invalid (too short) zip code
            await zipCodeHelper(page, "invalid");
        });
    })

    // Interest and property selection validation tests
    test.describe('Variants validation Regression', () => {
        test('should_show_required_error_when_no_interest_or_property_selected', async ({ page }) => {
            // Test submitting without selecting interest or property
            await zipCodeHelper(page, "valid")
            await interestOptionsHelper(page)
            await propertyOptionsHelper(page)
        })
    })

    // Full name and email validation tests
    test.describe('FullName & Email validation Regression', () => {
        test('should_show_error_for_invalid_fullname_and_email', async ({ page }) => {
            // Test with invalid full name and email
            await zipCodeHelper(page, "valid")
            await interestOptionsHelper(page, "Therapy")
            await propertyOptionsHelper(page, "Rental Property")
            await personalDataHelper(page, "invalid")
        })
        test('should_show_error_for_empty_fullname_and_email', async ({ page }) => {
            // Test with empty full name and email
            await zipCodeHelper(page, "valid")
            await interestOptionsHelper(page, "Therapy")
            await propertyOptionsHelper(page, "Rental Property")
            await personalDataHelper(page, "empty")
        })
        test('should_show_error_when_only_first_name_is_provided', async ({ page }) => {
            // Test with only first name provided
            await zipCodeHelper(page, "valid")
            await interestOptionsHelper(page, "Therapy")
            await propertyOptionsHelper(page, "Rental Property")
            await personalDataHelper(page, "onlyFirstName")
        })
    })

    // Phone number validation tests
    test.describe('Phonenumber Validations (Regression)', () => {
        test('should_show_error_for_invalid_phone_number', async ({ page }) => {
            // Test with invalid phone number
            await zipCodeHelper(page, "valid")
            await interestOptionsHelper(page, "Therapy")
            await propertyOptionsHelper(page, "Rental Property")
            await personalDataHelper(page, "valid")
            await phoneDataHelper(page, "invalid")
        })
        test('should_show_error_for_empty_phone_number', async ({ page }) => {
            // Test with empty phone number
            await zipCodeHelper(page, "valid")
            await interestOptionsHelper(page, "Therapy")
            await propertyOptionsHelper(page, "Rental Property")
            await personalDataHelper(page, "valid")
            await phoneDataHelper(page, "empty")
        })
    })
})
