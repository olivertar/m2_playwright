import { test, expect } from '@playwright/test';

test.describe('Purchase Frontend Flow', () => {

    test('User can purchase a product successfully', async ({ page }) => {
        test.setTimeout(60000); // Increase timeout for full flow

        // 0. Ensure clean state (Logout)
        await page.goto('/customer/account/logout/');

        // 1. Login
        await page.goto('/customer/account/login/');

        // Use :visible to ensure we interact with the visible form (avoiding hidden mobile/modal forms)
        await page.locator('#email:visible').fill('roni_cost@example.com');
        await page.locator('#password:visible').fill('roni_cost3@example.com');

        await page.locator('button.action.login.primary:visible').click();
        await expect(page).toHaveURL(/customer\/account/);

        // 2. Go to product page
        await page.goto('/olivia-1-4-zip-light-jacket.html');

        // 3. Select Options (Size: M, Color: Blue)
        // Note: Selectors might vary depending on the theme (Luma vs Hyva). 
        // Using standard Magento Luma selectors as a baseline.
        await page.locator('[aria-label="M"], .swatch-option.text:has-text("M")').first().click();
        await page.locator('[aria-label="Blue"], .swatch-option.color[option-label="Blue"]').first().click();

        // 4. Add 3 units
        await page.locator('#qty').fill('3');
        await page.locator('#product-addtocart-button').click();

        // Wait for success message or counter update
        await expect(page.locator('.message-success')).toBeVisible({ timeout: 10000 });

        // 5. Go to Cart
        await page.goto('/checkout/cart/');

        // 6. Proceed to Checkout
        // Wait for totals to load to ensure button is active
        await expect(page.locator('#shopping-cart-table')).toBeVisible();
        await page.locator('button[data-role="proceed-to-checkout"]').click();

        // 7. Checkout - Shipping Step
        // Wait for shipping form or address list
        await page.waitForURL(/checkout\/#shipping/);

        // Select first address if not selected (logic might need adjustment based on existing addresses)
        // Assuming default address is selected or we just need to select shipping method.

        // 8. Select "Table rate"
        // Value often 'tablerate_bestway' for Table Rate
        await page.locator('input[value="tablerate_bestway"]').click();

        // 9. Next Step
        await page.locator('button[data-role="opc-continue"]').click();

        // 10. Checkout - Payment Step
        await page.waitForURL(/checkout\/#payment/);

        // 11. Select "Check money order"
        // Value often 'checkmo'
        // Sometimes it's selected by default if it's the only one, but we click to be sure.
        // We might need to wait for the payment methods to load
        // Wait for payment methods to load
        await expect(page.locator('.payment-method')).toBeVisible({ timeout: 10000 });

        // Click the label for Check/Money Order
        await page.locator('label[for="checkmo"]').click();

        // 12. Place Order
        // Wait for the button to be visible and enabled. 
        // Sometimes there's a loading mask 'loading-mask' that needs to disappear.
        const placeOrderBtn = page.locator('button.action.primary.checkout');
        await expect(placeOrderBtn).toBeVisible();
        await expect(placeOrderBtn).toBeEnabled();

        // Ensure no visible loading mask is present
        await expect(page.locator('.loading-mask:visible')).toHaveCount(0);

        await placeOrderBtn.click();

        // 13. Verify Success
        // Order placement can be slow
        await expect(page).toHaveURL(/checkout\/onepage\/success/, { timeout: 20000 });
        await expect(page.locator('.page-title')).toContainText('Thank you for your purchase');
    });

});
