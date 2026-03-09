import { AxeBuilder } from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

export async function runAccessibilityScan(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  // Fail test if violations are found
  if (accessibilityScanResults.violations.length > 0) {
    console.log('Accessibility Violations:', accessibilityScanResults.violations);
  }
  
  expect(accessibilityScanResults.violations, 'No accessibility violations').toEqual([]);
}
