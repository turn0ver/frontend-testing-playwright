import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'https://app.ramp.com',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
