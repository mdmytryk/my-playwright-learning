import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("checkout flow", () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();

        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test("user can complete a purchase successfully", async ({ page }) => {

        await test.step("Add product to cart", async () => {
            await inventoryPage.addProductToCart("Sauce Labs Backpack");
            await inventoryPage.goToCart();
        });

        await test.step("start checkout", async () => {
            await page.getByRole("button", { name: "Checkout" }).click();
        });

        await test.step("fill in shipping information", async () => {
            await checkoutPage.fillCheckoutInformation("Maria", "Smith", "12345");
        });

        await test.step("verify product appears in overview", async () => {
            const products = await checkoutPage.getOverviewProductNames();
            expect(products).toContain("Sauce Labs Backpack");
        });

        await test.step("finish the order", async () => {
            await checkoutPage.finish();
        });

        await test.step("verify success message", async () => {
            await expect(checkoutPage.successMessage).toHaveText("Thank you for your order!");
        });
    });
});