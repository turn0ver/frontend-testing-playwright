import { test, expect } from '@playwright/test';

test.describe('Sign Up - UI Elements', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-up');
  });

  test('Page title and header are visible', async ({ page }) => {
    await expect(page).toHaveTitle(/sign up/i);
    const h2Element = page.getByRole('heading', { level: 2, name: 'Apply for Ramp' });
    await expect(h2Element).toBeVisible();
  });

  test('All form fields are visible and enabled', async ({ page }) => {
    const fields = [
      'input[name="first_name"]',
      'input[name="last_name"]',
      'input[name="email"]',
      'input[name="password"]'
    ];
    for (const field of fields) {
      await expect(page.locator(field)).toBeVisible();
      await expect(page.locator(field)).toBeEnabled();
    }
  });

  test('Sign Up button is visible by default', async ({ page }) => {
    const signupButton = page.locator('button[type="submit"]');
    await expect(signupButton).toBeVisible();
  });

});
