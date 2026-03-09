import { test, expect } from '@playwright/test';

test.describe('Login - UI Elements', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-in');
  });

  test('Page title is visible', async ({ page }) => {
    await expect(page).toHaveTitle('Sign in — Ramp');
  });

  test('Email field is visible and enabled', async ({ page }) => {
    const emailField = page.locator('input[name="email"]');
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEnabled();
  });

  test('Login button is visible by default', async ({ page }) => {
    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
  });

});
