import { expect, Locator } from "@playwright/test";

// Generic helper that works for *any* field
export async function validateFieldError(
  locator: Locator,
  expectedText: string,
  context?: string
) {
  await expect(locator).toBeVisible();

  const text = await locator.textContent();
  expect(text?.trim()).toBe(expectedText);

  console.log(
    `[${context ?? "Field"}] error OK: "${text?.trim()}" === "${expectedText}"`
  );
}
