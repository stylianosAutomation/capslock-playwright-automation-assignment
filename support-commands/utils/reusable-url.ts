
//create a reusable command ulrs
import { Page , expect } from '@playwright/test';

export const visitUrl = async (page: Page, url:string) => {
    await page.goto(url);
    await expect (url).toMatch(/global/)
}


