import { test, expect } from '@playwright/test';
import {
  validUser,
  invalidUser,
  invalidPasswordUser,
  emptyFields,
  invalidEmailFormat
} from '../fixtures/test-data.ts';

test.describe('Login - E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-in');
  });

  // ------------------------------
  // Functional Tests
  // ------------------------------
  test('Login with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', validUser.email);
    await page.click('button[type="submit"]');
    await page.fill('input[name="password"]', validUser.password);
    await page.click('button[type="submit"]');
  });

  test('Attempt login with empty fields', async ({ page }) => {
    await page.fill('input[name="email"]', emptyFields.email);
    await page.click('button[type="submit"]');
    await expect(page.getByText(' (required)')).toBeVisible();
  });

  test('Attempt login with unregistered email', async ({ page }) => {
    await page.fill('input[name="email"]', invalidUser.email);
    await page.click('button[type="submit"]');
    await page.fill('input[name="password"]', invalidUser.password);
    await page.click('button[type="submit"]');
    await expect(page.getByText('We do not recognize this email password combination. Try again or reset your password.')).toBeVisible();
  });

  test('Attempt login with invalid email format', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill(invalidEmailFormat.email);
    await page.click('button[type="submit"]');

    const errorMessage = page.locator('text=Please include an \'@\'in the email address')
    await expect(errorMessage).toBeVisible();
  });

});
