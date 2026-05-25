import { type Page, type Locator } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;
    readonly overviewItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder("First Name");
        this.lastNameInput = page.getByPlaceholder("Last Name");
        this.postalCodeInput = page.getByPlaceholder("Zip/Postal Code");
        this.continueButton = page.getByRole("button", { name: "Continue" });
        this.finishButton = page.getByRole("button", { name: "Finish" });
        this.successMessage = page.locator(".complete-header");
        this.overviewItems = page.locator(".cart_item");
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }
    async getOverviewProductNames(): Promise<string[]> {
        return await this.overviewItems.locator(".inventory_item_name").allTextContents();
    }

    async finish() {
        await this.finishButton.click();
    }
}