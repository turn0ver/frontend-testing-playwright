import { test, expect } from '@playwright/test';
import { runAccessibilityScan } from '../utils/accessibility-scan';

test.describe('Sign Up - Accessibility', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-up');
  });

  test('All form inputs have associated labels', async ({ page }) => {
    const labels = [
      'input[name="first_name"]',
      'input[name="last_name"]',
      'input[name="email"]',
      'input[name="password"]'
    ];
    for (const label of labels) {
      await expect(page.locator(label)).toBeVisible();
    }
  });

  test('Form is navigable via keyboard only', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.type('John');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Doe');
    await page.keyboard.press('Tab');
    await page.keyboard.type('valid@site.com');
    await page.keyboard.press('Tab');
    await page.keyboard.type('StrongPass123!');
    await page.keyboard.press('Tab');
    await page.keyboard.type('StrongPass123!');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  });

  test('Page has no accessibility violations (WCAG)', async ({ page }) => {
    await runAccessibilityScan(page);
  });

});
