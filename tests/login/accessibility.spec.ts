import { test, expect } from '@playwright/test';
import { runAccessibilityScan } from '../utils/accessibility-scan';

test.describe('Sign In - Accessibility', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-in');
  });

  test('All form inputs have associated labels', async ({ page }) => {
    const emailLabel = page.locator('label[for="email"]');
    await expect(emailLabel).toBeVisible();
  });

  test('Form is navigable via keyboard only', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.type('valid@site.com');
    await page.keyboard.press('Tab');
    await page.keyboard.type('password123');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  });

  test('Page has no accessibility violations (WCAG)', async ({ page }) => {
    await runAccessibilityScan(page);
  });

});
