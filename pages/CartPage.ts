import { type Page, type Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator(".cart_item");
    }

    async getProductNames(): Promise<string[]> {
        return await this.cartItems.locator(".inventory_item_name").allTextContents();
    }
}