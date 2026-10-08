import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'off',
    screenshot: 'only-on-failure',
    browserName: 'chromium',
    headless: true,
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 30000,
  },
  projects: [
    {
      name: 'desktop-no-preference',
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'desktop-reduced-motion',
      use: {
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      },
    },
    {
      name: 'mobile-no-preference',
      use: {
        viewport: { width: 390, height: 844 },
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'mobile-reduced-motion',
      use: {
        viewport: { width: 390, height: 844 },
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        hasTouch: true,
        isMobile: true,
        reducedMotion: 'reduce',
      },
    },
  ],
})
