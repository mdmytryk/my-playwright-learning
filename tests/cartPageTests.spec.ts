import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.describe("cart behavior", () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();

        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
    });

    test("cart badge shows correct count after adding a product", async () => {
        await inventoryPage.addProductToCart("Sauce Labs Backpack");
        await expect(inventoryPage.cartBadge).toHaveText("1");
    });

    test("cart page shows the name of the selected product", async () => {
        await inventoryPage.addProductToCart("Sauce Labs Backpack");
        await inventoryPage.goToCart();
        const names = await cartPage.getProductNames();
        expect(names).toContain("Sauce Labs Backpack");
    });

    test("removing a product updates the cart", async () => {
        await inventoryPage.addProductToCart("Sauce Labs Backpack");
        await inventoryPage.removeProductFromCart("Sauce Labs Backpack");
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });

    test("adding multiple products shows correct badge count", async () => {
        await inventoryPage.addProductToCart("Sauce Labs Backpack");
        await inventoryPage.addProductToCart("Sauce Labs Bike Light");
        await expect(inventoryPage.cartBadge).toHaveText("2");
    });
});