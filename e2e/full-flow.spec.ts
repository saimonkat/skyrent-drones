import { expect, test } from '@playwright/test';

const qa = (name: string) => `css=[data-qa="${name}"]`;

test('full user flow: catalog → verification → checkout → confirmation', async ({ page }) => {
  await page.goto('/');

  // Step 1 — Catalog: see drones, add one to cart
  await expect(page.locator(qa('catalog-page'))).toBeVisible();
  await page.locator(qa('drone-card')).first().locator(qa('add-to-cart-button')).click();

  // Step 2 — Cart drawer opens, start verification
  await expect(page.locator(qa('cart-drawer'))).toBeVisible();
  await page.locator(qa('verify-identity-button')).click();

  // Step 3 — Selfie capture
  await expect(page.locator(qa('verification-modal'))).toBeVisible();
  await expect(page.locator(qa('selfie-capture-button'))).toBeVisible({ timeout: 15_000 });
  await page.locator(qa('selfie-capture-button')).click();
  await page.locator(qa('selfie-confirm-button')).click();

  // Step 4 — Phone input
  await expect(page.locator(qa('phone-input'))).toBeVisible();
  await page.getByLabel('Phone number').fill('2025551234');
  await page.locator(qa('phone-submit-button')).click();

  // Step 5 — Address form
  await expect(page.locator(qa('address-form'))).toBeVisible();
  await page.getByLabel('Street Address').fill('123 Main Street');
  await page.getByLabel('City').fill('San Francisco');
  await page.getByLabel(/State/).fill('California');
  await page.getByLabel('Country').fill('United States');
  await page.getByLabel('Postal Code').fill('94102');
  await page.locator(qa('address-submit-button')).click();

  // Step 6 — Verification modal closes, cart drawer shows result
  // Score is random — wait for either proceed-to-checkout-button (verified) or verification-result (failed)
  const verifiedButton = page.locator(qa('proceed-to-checkout-button')).first();
  const failedResult = page.locator(qa('verification-result'));
  await expect(verifiedButton.or(failedResult)).toBeVisible({ timeout: 10_000 });

  const isVerified = await verifiedButton.isVisible();

  if (isVerified) {
    // Verified path → proceed to checkout
    await page.locator(qa('proceed-to-checkout-button')).first().click();

    await expect(page.locator(qa('checkout-page'))).toBeVisible();
    await page.locator(qa('complete-rental-button')).click();

    await expect(page.locator(qa('completion-screen'))).toBeVisible();
  } else {
    // Failed path → retry message visible
    await expect(page.locator(qa('verification-failed'))).toBeVisible();
    await expect(page.locator(qa('retry-verification-button'))).toBeVisible();
  }
});
