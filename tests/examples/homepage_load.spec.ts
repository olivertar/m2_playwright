import { test, expect } from '@playwright/test';

test.describe('Homepage Load Test', () => {

    test('Home page loads', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Home Page/);
    });

});
