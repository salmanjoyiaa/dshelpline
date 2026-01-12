import { test, expect } from '@playwright/test';

// Usage: set TEST_EMAIL and TEST_PASSWORD in environment (or use .env file with dotenv in your runner)
// Example: TEST_EMAIL=salman@locksmith.com TEST_PASSWORD=salman npx playwright test e2e/tests/ui-flows.spec.ts --project=chromium

const BASE = process.env.BASE_URL || 'https://dshelpline.vercel.app';
const EMAIL = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.warn('TEST_EMAIL and TEST_PASSWORD env vars not set. The test will try to proceed but is likely to fail.');
}

test.describe('Dashboard UI flows', () => {
  test('login, theme toggle, add/edit flows, pagination and screenshots', async ({ page }) => {
    // Go to site
    await page.goto(BASE, { waitUntil: 'networkidle' });

    // Login - try common selectors, adapt if your app differs
    const emailInput = page.locator('input[type="email"], input[name=email], input[id*=email]');
    const passInput = page.locator('input[type="password"], input[name=password], input[id*=password]');
    const submitBtn = page.locator('button:has-text("Sign in"), button:has-text("Sign In"), button:has-text("Login"), button[type=submit]');

    if (await emailInput.count() && EMAIL) await emailInput.fill(EMAIL);
    if (await passInput.count() && PASSWORD) await passInput.fill(PASSWORD);
    if (await submitBtn.count()) await submitBtn.click();

    // Wait for dashboard route (tolerant)
    await page.waitForURL('**/dashboard**', { timeout: 10000 }).catch(() => {});

    // Wait for some main dashboard element
    await page.locator('text=Dashboard, text=Recent Requests, text=Total Requests').first().waitFor({ timeout: 8000 }).catch(() => {});

    // Take initial screenshot
    await page.screenshot({ path: 'e2e/screenshots/dashboard-initial.png', fullPage: true });

    // Toggle theme (if toggle exists)
    const themeBtn = page.locator('button[title*="Switch"], button:has-text("Light"), button:has-text("Dark")');
    if (await themeBtn.count()) {
      await themeBtn.first().click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: 'e2e/screenshots/dashboard-theme-toggled.png', fullPage: true });
    }

    // Navigate to Providers
    await page.locator('a:has-text("Providers"), text=Providers').first().click().catch(()=>{});
    await page.waitForURL('**/dashboard/providers**', { timeout: 8000 }).catch(() => {});
    await page.screenshot({ path: 'e2e/screenshots/providers-list.png', fullPage: true });

    // Click Add Provider (if exists)
    const addProvider = page.locator('button:has-text("Add Provider"), button:has-text("New Provider"), text=Add Provider');
    if (await addProvider.count()) {
      await addProvider.first().click();
      // wait for dialog and screenshot
      await page.locator('[role=dialog], .dialog, .modal').first().waitFor({ timeout: 5000 }).catch(() => {});
      await page.screenshot({ path: 'e2e/screenshots/add-provider-dialog.png' });

      // Try to fill basic fields if present
      const name = page.locator('input[name=name], input[id*=name]');
      if (await name.count()) await name.fill('E2E Test Provider');

      // Submit if button exists
      const submit = page.locator('button:has-text("Add"), button:has-text("Create"), button:has-text("Save")');
      if (await submit.count()) {
        await submit.first().click();
        // allow toast
        await page.waitForTimeout(800);
        await page.screenshot({ path: 'e2e/screenshots/after-add-provider.png' });
      }
    }

    // Navigate to Requests
    await page.locator('a:has-text("Requests"), text=Requests').first().click().catch(()=>{});
    await page.waitForURL('**/dashboard/requests**', { timeout: 8000 }).catch(() => {});
    await page.screenshot({ path: 'e2e/screenshots/requests-list.png', fullPage: true });

    // Click Add Request
    const addRequest = page.locator('button:has-text("Add Request"), button:has-text("New Request"), text=Add Request');
    if (await addRequest.count()) {
      await addRequest.first().click();
      await page.locator('[role=dialog], .dialog, .modal').first().waitFor({ timeout: 5000 }).catch(() => {});
      await page.screenshot({ path: 'e2e/screenshots/add-request-dialog.png' });

      // Fill simple fields if present
      const title = page.locator('input[name=title], input[id*=title], textarea[name=description]');
      if (await title.count()) await title.fill('E2E Test Request');

      // Try select dropdown for provider inside dialog and assert visible
      const providerSelect = page.locator('button:has-text("Select a provider"), [data-slot="select-trigger"]');
      if (await providerSelect.count()) {
        await providerSelect.first().click();
        // wait for select content
        await page.waitForTimeout(300);
        await page.screenshot({ path: 'e2e/screenshots/add-request-provider-dropdown.png' });
      }

      // Submit if button exists
      const submit = page.locator('button:has-text("Create"), button:has-text("Add"), button:has-text("Save"), button[type=submit]');
      if (await submit.count()) {
        await submit.first().click();
        await page.waitForTimeout(800);
        await page.screenshot({ path: 'e2e/screenshots/after-add-request.png' });
      }
    }

    // Pagination check: go to next page if pagination exists
    const nextBtn = page.locator('button:has-text("Next"), [aria-label="Go to next page"], text=Next');
    if (await nextBtn.count()) {
      await nextBtn.first().click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'e2e/screenshots/requests-next-page.png', fullPage: true });
    }

    // Edit first request if edit button exists
    const editBtn = page.locator('button[aria-label="Edit"], button:has-text("Edit"), .edit-button');
    if (await editBtn.count()) {
      await editBtn.first().click();
      await page.locator('[role=dialog], .dialog, .modal').first().waitFor({ timeout: 5000 }).catch(() => {});
      await page.screenshot({ path: 'e2e/screenshots/edit-request-dialog.png' });

      // Check dropdown visibility inside dialog
      const statusSelect = page.locator('[data-slot="select-trigger"]');
      if (await statusSelect.count()) {
        await statusSelect.first().click();
        await page.waitForTimeout(300);
        // assert that the dropdown is visible within viewport
        const dropdown = page.locator('[data-slot="select-content"]');
        if (await dropdown.count()) {
          const box = await dropdown.first().boundingBox();
          expect(box).not.toBeNull();
        }
        await page.screenshot({ path: 'e2e/screenshots/edit-request-dropdown.png' });
      }

      // Close dialog
      const cancel = page.locator('button:has-text("Cancel"), button:has-text("Close")');
      if (await cancel.count()) await cancel.first().click();
    }

    // Final screenshot
    await page.screenshot({ path: 'e2e/screenshots/final-state.png', fullPage: true });
  });
});
