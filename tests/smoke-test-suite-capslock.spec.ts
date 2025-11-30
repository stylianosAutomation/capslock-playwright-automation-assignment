// Import Playwright test runner
import { test } from '@playwright/test';
// Import utility to visit URLs
import { visitUrl } from "../support-commands/utils/reusable-url";
// Import custom hook for environment and brand selection
import { useBrandEnv } from '../support-commands/hooks/environment-url'

import { interestOptionsHelper } from '../support-commands/helpers/interest-options-helper';

import { propertyOptionsHelper } from '../support-commands/helpers/property-options-helper';
import { zipCodeHelper } from '../support-commands/helpers/zip-code-helper'

import {personalDataHelper} from '../support-commands/helpers/personal-data-helpers'
import { phoneDataHelper} from '../support-commands/helpers/phone-data-helpers'


import {ThankYouPage} from '../page-objects/step6-thanks-page'

//use the reusable env hook to get the correct enum type env and brand
const { currentUrl } = useBrandEnv("test","capslock");

test.describe("CapsLock - Happy Test (Smoke)", ()=>{

   test.beforeEach(async ({page}) =>{
      // Confirm test url exists before each test, then visit
        if (!currentUrl) {
            throw new Error('Demo URL not found in brands array');
        }
        await visitUrl(page,currentUrl)
   })
 test('should_submit_form_successfully_and_redirect_to_thank_you_page', async ({ page }) => {
      await zipCodeHelper(page,"valid")
      await interestOptionsHelper(page,"Safety")
      await propertyOptionsHelper(page,"Rental Property")
      await personalDataHelper(page,"valid")
      await phoneDataHelper(page,"valid")
      const step6 =  new ThankYouPage(page)
      await step6.thankYouPage()
 })
})
