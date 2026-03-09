import { test, expect } from '@playwright/test';

test.describe('Sign Up - E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-up');
  });

  // ------------------------------
  // Functional Tests
  // ------------------------------
  test('Sign up with valid email and strong password', async ({ page }) => {
    await page.fill('input[name="email"]', 'newuser@site.com');
    await page.fill('input[name="first_name"]', 'John');
    await page.fill('input[name="last_name"]', 'Costa');
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');
  });

  test('Sign up with invalid email format', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalidEmail');
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Invalid email address')).toBeVisible();
  });


  // ------------------------------
  // Boundary Value Analysis
  // ------------------------------
  test('Password length at minimum allowed value', async ({ page }) => {
    await page.fill('input[name="email"]', 'valid@site.com');
    await page.fill('input[name="first_name"]', 'John');
    await page.fill('input[name="last_name"]', 'Costa');
    await page.fill('input[name="password"]', 'Minimum100!');
    await page.click('button[type="submit"]');
  });

  test('Password length just below minimum', async ({ page }) => {
    await page.fill('input[name="email"]', 'valid@site.com');
    await page.fill('input[name="first_name"]', 'John');
    await page.fill('input[name="last_name"]', 'Costa');
    await page.fill('input[name="password"]', 'Min12');
    await page.click('button[type="submit"]');
    await expect(page.getByText('At least 12 characters')).toBeVisible(); 
  });

  test('First Name field at maximum allowed length', async ({ page }) => {
    await page.fill('input[name="first_name"]', 'Iamtryingtoputareallybignamehereanditispossible');
    await page.fill('input[name="last_name"]', 'Doe');
    await page.fill('input[name="email"]', 'valid@site.com');
    await page.fill('input[name="password"]', 'Pass1234!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('First name must be at most 40 characters')).toBeVisible(); 
  });

  test('First Name field at minimum allowed length', async ({ page }) => {
    await page.fill('input[name="first_name"]', 'A');
    await page.fill('input[name="last_name"]', 'Doe');
    await page.fill('input[name="email"]', 'valid@site.com');
    await page.fill('input[name="password"]', 'Pass1234!');
    await page.click('button[type="submit"]');
  });
});
