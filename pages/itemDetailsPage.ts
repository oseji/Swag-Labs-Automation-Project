import { WebDriver, By, until } from "selenium-webdriver";
import { waitAndClick, waitForElement } from "../utils/webElementHelpers";

export class DetailsPage {
	private driver: WebDriver;
	private timeout: number;

	constructor(driver: WebDriver, timeout: number) {
		this.driver = driver;
		this.timeout = timeout;
	}

	locators = {
		backToProductsButton: By.id("back-to-products"),
		removeButton: By.id("remove"),
		addToCartButton: By.id("add-to-cart"),
	};

	async clickBackToProductsButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.backToProductsButton,
			"back to products button"
		);
	}

	async clickRemoveButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.removeButton,
			"remove button"
		);
	}

	async clickAddToCartButton(): Promise<void> {
		await waitAndClick(
			this.driver,
			this.locators.addToCartButton,
			"add to cart button"
		);
	}
}
