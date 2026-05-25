import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Product sorting", () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();

        inventoryPage = new InventoryPage(page);
    });

    test("Products are sorted by price low to high", async () => {
        await test.step("Select price low to high sorting", async () => {
            await inventoryPage.sortBy("lohi");
        });

        await test.step("Collect all prices from the page", async () => {
            const prices = await inventoryPage.getPrices();
            console.log("Prices found:", prices);

            await test.step("Verify prices are in ascending order", async () => {
                const sorted = [...prices].sort((a, b) => a - b);
                expect(prices).toEqual(sorted);
            });
        });
    });
});