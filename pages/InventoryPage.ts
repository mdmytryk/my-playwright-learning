import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartIcon: Locator;
    readonly sortDropdown: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.cartIcon = page.locator(".shopping_cart_link");
        this.sortDropdown = page.locator(".product_sort_container");
        this.productPrices = page.locator(".inventory_item_price");
    }

    async open() {
        await this.page.goto("/inventory.html");
    }

    async addProductToCart(productName: string) {
        const product = this.page.locator(".inventory_item").filter({ hasText: productName });
        await product.getByRole("button", { name: "Add to cart" }).click();
    }

    async removeProductFromCart(productName: string) {
        const product = this.page.locator(".inventory_item").filter({ hasText: productName });
        await product.getByRole("button", { name: "Remove" }).click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getPrices(): Promise<number[]> {
        const priceTexts = await this.productPrices.allTextContents();
        return priceTexts.map(price => parseFloat(price.replace("$", "")));
    }
}