import { test, expect } from '@playwright/test';

test.describe('Login Frontend User OK', () => {

    test('User can log in successfully', async ({ page }) => {
        // 1. Arrange: Go to the login page
        await page.goto('/customer/account/login/');

        // 2. Act: Fill in credentials and submit
        await page.locator('#email').fill('roni_cost@example.com');
        await page.locator('#password').fill('roni_cost3@example.com');

        // Click the Sign In button
        // Using a robust selector for the primary action button in the login form
        await page.locator('fieldset.login button.action.login.primary').click();

        // 3. Assert: Verify successful login
        // Usually redirects to My Account or Home Page. 
        // We check for "My Account" title or dashboard element.
        await expect(page).toHaveURL(/customer\/account/);
        await expect(page.locator('.page-title')).toHaveText(/My Account/i);

        // Optional: Check for welcome message if standard Magento
        // await expect(page.locator('.greet.welcome')).toContainText(/Welcome/);
    });

});
